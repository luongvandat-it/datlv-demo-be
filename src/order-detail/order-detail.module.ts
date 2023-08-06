import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailResolver } from './order-detail.resolver';
import { OrderDetailService } from './order-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  providers: [OrderDetailResolver, OrderDetailService]
})
export class OrderDetailModule { }