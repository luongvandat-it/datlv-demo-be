import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => Int)
  id: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Owner Id is required!' })
  ownerId: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Product Id is required!' })
  productId: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Quantity is required!' })
  quantity: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Employee Id is required!' })
  employeeId: number;
}