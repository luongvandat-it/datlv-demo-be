import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "src/owner/entities/owner.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pet' })
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn({ type: 'int', name: 'pet_id'})
    @Field(type => Int)
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
    @Field()
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false, name: 'type' })
    @Field()
    type: string;

    @ManyToOne(() => Owner, owner => owner.pets)
    @JoinColumn({ name: 'owner_id'})
    owner: Owner;

    @CreateDateColumn({ type: 'datetime', nullable: true, name: 'create_date' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true, name: 'update_date' })
    @Field()
    updatedAt: Date;
}