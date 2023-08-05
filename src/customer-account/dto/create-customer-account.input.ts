import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateCustomerAccountInput {
  @Field()
  @IsEmail({}, { message: 'Email is not valid!' })
  @IsNotEmpty({ message: 'Email is required!' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required!' })
  level: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'Owner Id is required!' })
  ownerId: number;
}