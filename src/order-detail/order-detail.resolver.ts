import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailService } from './order-detail.service';

@Resolver(() => OrderDetail)
export class OrderDetailResolver {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Mutation(() => OrderDetail)
  createOrderDetail(
    @Args('createOrderDetailInput')
    createOrderDetailInput: CreateOrderDetailInput,
  ) {
    return this.orderDetailService.create(createOrderDetailInput);
  }

  @Query(() => [OrderDetail], { name: 'orderDetail' })
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Mutation(() => OrderDetail)
  updateOrderDetail(
    @Args('updateOrderDetailInput')
    updateOrderDetailInput: UpdateOrderDetailInput,
  ) {
    return this.orderDetailService.update(
      updateOrderDetailInput.id,
      updateOrderDetailInput,
    );
  }

  @Mutation(() => OrderDetail)
  removeOrderDetail(@Args('id', { type: () => Int }) id: number) {
    return this.orderDetailService.remove(id);
  }
}
