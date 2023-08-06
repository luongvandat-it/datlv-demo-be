import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(@InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>) { }

  create(createOrderDetailInput: CreateOrderDetailInput) {
    const newOrderDetail = this.orderDetailRepository.create(createOrderDetailInput);
    return this.orderDetailRepository.save(newOrderDetail);
  }

  findAll() {
    return this.orderDetailRepository.find();
  }

  update(id: number, updateOrderDetailInput: UpdateOrderDetailInput) {
    const updatedOrderDetail = this.orderDetailRepository.create(updateOrderDetailInput);
    return this.orderDetailRepository.save(updatedOrderDetail);
  }

  remove(id: number) {
    return this.orderDetailRepository.delete(id);
  }
}