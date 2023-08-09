import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderDetailInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Order id is required' })
  orderId: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Product id is required' })
  productId: number;

  @Field(() => Int)
  quantity: number;
}
