import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class UpdatePetInput {
  @Field(() => Int)
  @Column()
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;

  @Column()
  @Field()
  @IsNotEmpty({ message: 'Name is required!' })
  @MaxLength(255, { message: 'Name is too long!' })
  name: string;

  @Column()
  @Field()
  @IsNotEmpty({ message: 'Type is required!' })
  @MaxLength(255, { message: 'Type is too long!' })
  type: string;
}
