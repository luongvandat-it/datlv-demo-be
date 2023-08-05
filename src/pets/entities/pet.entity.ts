import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Owner } from "src/owner/entities/owner.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
    @Field()
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false, name: 'type' })
    @Field()
    type: string;

    @Column({ type: 'int', nullable: false, name: 'owner_id' })
    @Field(type => Int)
    ownerId: number;

    @ManyToOne(() => Owner, owner => owner.pets)
    @JoinColumn()
    @Field(type => Owner)
    owner: Owner;

    @CreateDateColumn({ type: 'datetime', nullable: true, name: 'create_date' })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true, name: 'update_date' })
    @Field()
    updatedAt: Date;
}