import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerModule } from './owner/owner.module';
import { PetsModule } from './pets/pets.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerAccountModule } from './customer-account/customer-account.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // csrfPrevention: false,
    // playground: true,
  }), TypeOrmModule.forRoot({
    ...require(path.resolve('ormconfig.json')),
  }), PetsModule, OwnerModule, CustomerAccountModule, OrderModule, ProductModule, EmployeeModule, OrderDetailModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }