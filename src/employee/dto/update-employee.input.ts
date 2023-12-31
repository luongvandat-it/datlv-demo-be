import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator';
import { CreateEmployeeInput } from './create-employee.input';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;

  @Field()
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Email is not valid!' })
  @IsNotEmpty({ message: 'Email is required!' })
  @MaxLength(100, { message: 'Email is too long!' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long!' })
  @IsStrongPassword({}, { message: 'Password is required contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long!' })
  password: string;
}