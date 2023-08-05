import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateOwnerInput {
  @Column()
  @Field()
  @IsNotEmpty({ message: 'Name is required!' })
  @MaxLength(255, { message: 'Name is too long!' })
  name: string;

  @Column()
  @Field()
  @IsEmail({}, { message: 'Email is not valid!' })
  @IsNotEmpty({ message: 'Email is required!' })
  @MaxLength(255, { message: 'Email is too long!' })
  email: string;

  @Column()
  @Field()
  @IsNotEmpty({ message: 'Password is required!' })
  @IsStrongPassword({}, { message: 'Password is required contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long!' })
  password: string;
}