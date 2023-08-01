import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateOwnerInput {
  @Column()
  @Field()
  name: string;
}