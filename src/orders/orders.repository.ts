import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './orders.schema';
import { Model, UpdateQuery } from 'mongoose';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findOne(uuid: string) {
      return await this.orderModel.findOne({ uuid }).lean().exec();
  }

  async create(createOrderDto) {
    console.time("Mongodb write speed");
    const result = await this.orderModel.create(createOrderDto);
    console.timeEnd("Mongodb write speed");
    return result
  }

  async update(uuid, updateOrderDto) {
    console.time("Mongodb update speed");
    const result = await this.orderModel.updateMany({uuid}, updateOrderDto )
    console.timeEnd("Mongodb update speed");
    const segment: Order = result as any;
    return segment
  }

  async updateOneByUuid(
    uuid: string,
    update: UpdateQuery<Order>,
  ): Promise<Order> {
    return (await this.orderModel.findOneAndUpdate({ uuid }, update, {
      new: true,
    }))?.toJSON();
  }

  async updateOrderItemsStatus(
    uuid: string,
    status: string,
    skus: string[],
  ): Promise<Order> {
    return (await this.orderModel.findOneAndUpdate(
      { uuid },
      { $set: { 'items.$[x].item_status': status } },
      { arrayFilters: [{ 'x.sku': { $in: skus } }], new: true },
    ))?.toJSON();
  }

  async find(
    filter: any,
    size: number,
    page: number,
    sort: string
  ) {
    const sortObject = {}
    if (sort) {
      const SortDetails = sort.split('.')
      sortObject[SortDetails[0]] = SortDetails[1] === 'asc' || SortDetails[1] === 'ASC' ? 1 : -1
    }
    else{
      sortObject['createdAt'] = -1
    }

    const offset = (size || 0) * (page - 1 || 0)

    let data = await this.orderModel.find(filter)
      .sort(sortObject)
      .skip(offset)
      .limit(+size);
      
    return data
  }

  async createOrder(ordersDetails) {
    return  await this.orderModel.create(ordersDetails);
  }
}
