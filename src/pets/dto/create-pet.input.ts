import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required!' })
  @MaxLength(255, { message: 'Name is too long!' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Type is required!' })
  @MaxLength(255, { message: 'Type is too long!' })
  type: string;

  @Field()
  @IsNotEmpty({ message: 'Owner Id is required!' })
  ownerId: number;
}
