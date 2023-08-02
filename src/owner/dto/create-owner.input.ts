import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateOwnerInput {
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