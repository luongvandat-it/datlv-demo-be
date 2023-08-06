import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Employee Id is required' })
  employeeId: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'Customer Id is required' })
  customerId: number;
}