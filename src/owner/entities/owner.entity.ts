import { Field, Int, ObjectType } from "@nestjs/graphql";
import { CustomerAccount } from "src/customer-account/entities/customer-account.entity";
import { Order } from "src/order/entities/order.entity";
import { Pet } from "src/pets/entities/pet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'owner' })
export class Owner {
  @PrimaryGeneratedColumn({ type: 'int', name: 'owner_id' })
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

  @OneToOne(() => CustomerAccount)
  @JoinColumn({ name: 'owner_id' })
  customerAccount: CustomerAccount;
}