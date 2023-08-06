import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(type => Int)
  @IsNotEmpty({ message: 'Employee Id is required' })
  employeeId: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Customer Id is required' })
  customerId: number;
}