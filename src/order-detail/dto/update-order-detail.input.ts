import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderDetailInput } from './create-order-detail.input';

@InputType()
export class UpdateOrderDetailInput extends PartialType(
  CreateOrderDetailInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Order id is required' })
  orderId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Product id is required' })
  productId: number;

  @Field(() => Int)
  quantity: number;
}
