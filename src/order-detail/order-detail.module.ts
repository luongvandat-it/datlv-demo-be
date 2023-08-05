import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailResolver } from './order-detail.resolver';

@Module({
  providers: [OrderDetailResolver, OrderDetailService]
})
export class OrderDetailModule {}
