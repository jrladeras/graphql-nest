import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transform, TransformFnParams, Type } from 'class-transformer';
import { OrderPaymentStatus } from 'src/constants/payment.constants';
import { DiningOption, OrderStatus } from 'src/constants';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OrderDTO {
  @Field()
  @IsEnum(OrderStatus)
  order_status: string;

  @Field()
  @IsString()
  @IsEnum(DiningOption)
  fulfillment_type: string;

  @Field()
  @IsOptional()
  mode_of_payment: string;

  @Field()
  @IsOptional()
  @IsString()
  payment_network: string;

  @Field()
  @IsOptional()
  @IsString()
  @Transform(({ value }: TransformFnParams) =>
    value ? value : OrderPaymentStatus.Pending,
  )
  @IsEnum(OrderPaymentStatus)
  payment_status: string;

  @Field()
  @IsOptional()
  @IsNumber()
  total_amount: string;
}
