import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateCustomerAccountInput } from './create-customer-account.input';

@InputType()
export class UpdateCustomerAccountInput extends PartialType(CreateCustomerAccountInput) {
  @Field()
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;

  @Field()
  @IsEmail({}, { message: 'Email is not valid!' })
  @IsNotEmpty({ message: 'Email is required!' })
  @MaxLength(100, { message: 'Email is too long!' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required!' })
  level: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Owner Id is required!' })
  ownerId: number;
}