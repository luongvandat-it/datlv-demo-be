import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateCustomerAccountInput {
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