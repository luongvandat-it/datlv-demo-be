import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: 'Employee Id is required' })
  employeeId: number;

  @Field()
  @IsNotEmpty({ message: 'Customer Id is required' })
  customerId: number;
}
