import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { join } from 'path';
import { EmployeeModule } from './employee/employee.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { OrderModule } from './order/order.module';
import { OwnerModule } from './owner/owner.module';
import { PetsModule } from './pets/pets.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    csrfPrevention: false,
    playground: true,
  }), TypeOrmModule.forRoot({
    ...require(path.resolve('ormconfig.json')),
  }), PetsModule, OwnerModule, OrderModule, ProductModule,
   EmployeeModule, OrderDetailModule, CategoryModule,AuthModule, RolesModule],
})
export class AppModule { }