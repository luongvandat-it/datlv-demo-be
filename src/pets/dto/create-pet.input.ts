import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreatePetInput {
    @IsNotEmpty()
    @Field()
    name: string;
   
    @Field({ nullable: true })
    type?: string;
}