import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'order_id' })
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'order_date' })
  orderDate: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Employee, (employee) => employee.orders)
  employee: Employee;

  @ManyToOne(() => Owner, (owner) => owner.orders)
  owner: Owner;
}
