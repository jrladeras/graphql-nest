import { v4 as uuid } from 'uuid'
import { Inject, Injectable } from '@nestjs/common';

import { OrdersRepository } from './orders.repository';

import {
  OrderDTO, QueryOptions
} from './dto';

@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrdersRepository,) {}
  async create(createOrderDto: OrderDTO) {
    const result = await this.orderRepository.createOrder({
      uuid: uuid(),
      ...createOrderDto
    });
    
    return result
  }

  async findAll(options: QueryOptions) {

    const {sort, page, per_page, ...query} = options

    let filters = {}
    const keys = Object.keys(query)

    for (const key of keys) {
        filters[key] = query[key]
    }
    return await this.orderRepository.find(filters, per_page, page, sort);
  }

  async findOne(uuid: string) {
    return await this.orderRepository.findOne(uuid);
  }

  async update(uuid: string, updateOrderDto: any) {
    return `This action updates #${uuid} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
