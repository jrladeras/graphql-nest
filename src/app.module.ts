import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './src/config/.env' }),
    GraphQLModule.forRoot({ 
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    OrdersModule,
    DatabaseModule
  ],
  providers: [],
})
export class AppModule {}
