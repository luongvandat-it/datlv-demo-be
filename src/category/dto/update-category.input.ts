import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field()
  @IsNotEmpty({ message: 'Category id is required' })
  id: number;

  @Field()
  @IsNotEmpty({ message: 'Category name is required' })
  @MaxLength(255, { message: 'Category name is too long' })
  name: string;

  @Field()
  @MaxLength(255, { message: 'Category description is too long' })
  description?: string;
}
