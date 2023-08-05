import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { Column } from "typeorm";

@InputType()
export class CreatePetInput {
    @Column()
    @Field()
    @IsNotEmpty({ message: 'Name is required!'})
    @MaxLength(255, { message: 'Name is too long!'})
    name: string;

    @Column({ nullable: false })
    @Field({ nullable: false })
    @IsNotEmpty({message: 'Type is required!'})
    @MaxLength(255, { message: 'Type is too long!'})
    type: string;

    @Column()
    @Field(type => Int)
    @IsNotEmpty({message: 'Owner Id is required!'})
    ownerId: number;
}