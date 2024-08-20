import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type OrderDocument = Order & Document

@Schema({ collection: 'orders', strict: false, timestamps: true })
export class Order {
    @Prop({ required: true })
    uuid: string;

    @Prop({ required: true })
    order_status: string;

    @Prop({ required: true })
    fulfillment_type: string;

    @Prop({ required: false, default: '' })
    mode_of_payment: string;

    @Prop({ required: false, default: '' })
    payment_network: string;

    @Prop({ required: true })
    payment_status: string;
    sub_total_amount: number;

    @Prop({ required: true })
    total_amount: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order)