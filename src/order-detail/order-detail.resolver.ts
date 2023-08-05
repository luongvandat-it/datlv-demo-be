import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderDetailService } from './order-detail.service';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';

@Resolver(() => OrderDetail)
export class OrderDetailResolver {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Mutation(() => OrderDetail)
  createOrderDetail(@Args('createOrderDetailInput') createOrderDetailInput: CreateOrderDetailInput) {
    return this.orderDetailService.create(createOrderDetailInput);
  }

  @Query(() => [OrderDetail], { name: 'orderDetail' })
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Query(() => OrderDetail, { name: 'orderDetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.orderDetailService.findOne(id);
  }

  @Mutation(() => OrderDetail)
  updateOrderDetail(@Args('updateOrderDetailInput') updateOrderDetailInput: UpdateOrderDetailInput) {
    return this.orderDetailService.update(updateOrderDetailInput.id, updateOrderDetailInput);
  }

  @Mutation(() => OrderDetail)
  removeOrderDetail(@Args('id', { type: () => Int }) id: number) {
    return this.orderDetailService.remove(id);
  }
}
