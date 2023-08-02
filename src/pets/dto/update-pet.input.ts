import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class UpdatePetInput {
    @Field(() => Int)
    @Column()
    id: number;

    @Column()
    @Field()
    @IsNotEmpty()
    name: string;

    @Column()
    @Field()
    @IsNotEmpty()
    type: string;
}