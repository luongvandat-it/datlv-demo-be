import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }

  create(createOrderInput: CreateOrderInput) {
    const newOrder = this.orderRepository.create(createOrderInput);
    return this.orderRepository.save(newOrder);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOneOrFail({
      where: {
        id: id
      }
    });
  }

  // update(employeeId: number, customerId: number, updateOrderInput: UpdateOrderInput) {
  //   const updatedOrder = this.orderRepository.create(updateOrderInput);
  //   return this.orderRepository.save(updatedOrder);
  // }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }
}