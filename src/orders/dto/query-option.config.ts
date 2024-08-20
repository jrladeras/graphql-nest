import { IsString, IsEnum } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { OrderStatus } from 'src/constants/order-status.enum';
import { DiningOption } from 'src/constants/dining-option.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class QueryOptions {
    @Field({nullable: true})
    @Transform(({ value }: TransformFnParams) => (value ? value : 1))
    page?: number

    @Field({nullable: true})
    @Transform(({ value }: TransformFnParams) => (value ? value : 10))
    per_page?: number

    @Field({nullable: true})
    @Transform(({ value }: TransformFnParams) => (value ? value : 'desc'))
    @IsString()
    sort?: string

    @Field({nullable: true})
    @IsEnum(OrderStatus)
	order_status?: string;

    @Field({nullable: true})
    @IsString()
	fulfillment_type?: string;
}