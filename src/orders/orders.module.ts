import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderResolver } from './orders.resolver';
@Module({
  imports: [],
  providers: [OrdersService, OrderResolver],
  exports: [OrdersService]
})
export class OrdersModule { }
