import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID)
  uuid: string;

  @Field()
  order_status: string;

  @Field()
  fulfillment_type: string;

  @Field()
  payment_status: string;

  @Field()
  mode_of_payment: string;

  @Field()
  payment_network: string;

  @Field()
  total_amount: string;
}
