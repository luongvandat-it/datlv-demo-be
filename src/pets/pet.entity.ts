import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "src/owner/entities/owner.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: false })
    @Field({ nullable: false })
    type?: string;

    @Column()
    @Field(type => Int)
    ownerId: number;

    @ManyToOne(() => Owner, owner => owner.pets)
    @Field(type => Owner)
    owner: Owner;
}