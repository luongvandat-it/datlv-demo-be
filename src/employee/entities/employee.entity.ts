import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(type => Int)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  @Field(type => String)
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'email' })
  @Field(type => String)
  email: string;

  @Column({ type: 'varchar', length: 100, name: 'password' })
  @Field(type => String)
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: false, name: 'phone' })
  @Field(type => String)
  phone: string;

  @Column({ type: 'varchar', length: 255, name: 'address' })
  @Field(type => String)
  address: string;

  @Column({ type: 'datetime', name: 'birthday' })
  @Field(type => Date)
  birthday: Date;

  @Column({ type: 'varchar', length: 255, name: 'avatar' })
  @Field(type => String)
  avatar: string;

  @Column({ type: 'boolean', default: true, name: 'status_account' })
  @Field(type => Boolean)
  statusAccount: true;

  @CreateDateColumn({ type: 'datetime', name: 'start_date' })
  @Field(type => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'update_date' })
  @Field(type => Date)
  updatedAt: Date;

  @OneToMany(() => Order, order => order.employee)
  @Field(type => [Order])
  orders: Order[];
}