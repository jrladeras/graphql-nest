import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { OrdersService } from "./orders.service";
import { Order } from "./entities/orders.entity";
import { OrderDTO, QueryOptions } from "./dto";


@Resolver()

export class OrderResolver {
    constructor(private ordersService: OrdersService) {}
    @Mutation(() => Order)
    createOrder(@Args('createOrderInput') createOrderInput: OrderDTO) {
        return this.ordersService.create(createOrderInput); 
    }

    @Query(returns => [Order])
    async orders(@Args('QueryOptions') filter: QueryOptions) {
        return this.ordersService.findAll(filter);
    }
}