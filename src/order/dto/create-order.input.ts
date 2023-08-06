import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
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