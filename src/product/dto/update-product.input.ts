import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => Int)
  @Column()
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Name is required!' })
  @MaxLength(255, { message: 'Name is too long!' })
  name: string;

  @Field()
  @Column()
  @IsNotEmpty({ message: 'Price is required!' })
  price: number;

  @Field()
  @Column()
  @MaxLength(255, { message: 'Description is too long!' })
  description?: string;
}