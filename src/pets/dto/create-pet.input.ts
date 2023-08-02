import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

@InputType()
export class CreatePetInput {
    @Column()
    @Field()
    @IsNotEmpty()
    name: string;

    @Column({ nullable: false })
    @Field({ nullable: false })
    @IsNotEmpty()
    type?: string;

    @Column()
    @Field(type => Int)
    ownerId: number;
}