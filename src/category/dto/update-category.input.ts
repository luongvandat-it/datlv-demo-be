import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(type => Int)
  @IsNotEmpty({ message: 'Category id is required' })
  id: number;

  @Field(type => String)
  @IsNotEmpty({ message: 'Category name is required' })
  @MaxLength(255, { message: 'Category name is too long' })
  name: string;

  @Field(type => String)
  @MaxLength(255, { message: 'Category description is too long' })
  description?: string;
}