import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(type => String)
  @IsNotEmpty({ message: 'Category name is required' })
  @MaxLength(255, { message: 'Category name is too long' })
  name: string;

  @Field(type => String)
  @MaxLength(255, { message: 'Category description is too long' })
  description?: string;
}