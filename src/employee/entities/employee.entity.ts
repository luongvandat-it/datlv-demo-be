import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 100, name: 'email' })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 100, name: 'password' })
  @Field()
  password: string;

  @Column({ type: 'varchar', length: 20, nullable: false, name: 'phone' })
  @Field()
  phone: string;

  @Column({ type: 'varchar', length: 255, name: 'address' })
  @Field()
  address: string;

  @Column({ type: 'datetime', name: 'birthday' })
  @Field()
  birthday: Date;

  @Column({ type: 'varchar', length: 255, name: 'avatar' })
  @Field()
  avatar: string;

  @Column({ type: 'boolean', default: true, name: 'status_account' })
  @Field()
  statusAccount: true;

  @CreateDateColumn({ type: 'datetime', name: 'start_date' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'update_date' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.employee)
  @Field(() => [Order])
  orders: Order[];

  @OneToOne(() => Role, (role) => role.id)
  @JoinColumn()
  role: Relation<Role>;
}
