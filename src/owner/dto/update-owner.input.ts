import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class UpdateOwnerInput {
  @Column()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  @IsNotEmpty()
  name: string;

  @Column()
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}