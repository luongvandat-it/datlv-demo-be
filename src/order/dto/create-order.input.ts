import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn } from 'typeorm';

@InputType()
export class CreateOrderInput {
  @Field()
  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'createAt' })
  orderDate: Date;

  @Column({ type: 'int', nullable: false, name: 'owner_id' })
  @Field(type => Int)
  @IsNotEmpty({ message: 'Owner Id is required!' })
  ownerId: number;
}
