import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Order } from "src/order/entities/order.entity";
import { Pet } from "src/pets/entities/pet.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'email' })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'password' })
  @Field()
  password: string;

  @Column({ type: 'boolean', default: true, name: 'status_account' })
  @Field(type => Boolean)
  statusAccount: true;

  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'startDate' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true, name: 'updateDate' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Pet, pet => pet.owner)
  @Field(type => [Pet])
  pets: Pet[];

  @OneToMany(() => Order, order => order.owner)
  @Field(type => [Order])
  orders: Order[];
}