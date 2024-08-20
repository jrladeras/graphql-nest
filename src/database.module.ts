import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersRepository } from './orders/orders.repository';
import { Order, OrderSchema } from './orders/orders.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mongooseURL = `${configService.get(
          'DB_HOST',
        )}:${configService.get('DB_PORT')}/${configService.get(
          'DB_NAME',
        )}?authSource=${configService.get('DB_AUTHSOURCE')}`;
        return {
          uri: `mongodb://${mongooseURL}`,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  providers: [
    OrdersRepository,
  ],
  exports: [
    OrdersRepository,
  ],
})
export class DatabaseModule {}
