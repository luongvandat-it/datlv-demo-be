import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @PrimaryColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'createAt' })
  orderDate: Date;

  @Column({ type: 'int', nullable: false, name: 'owner_id' })
  @Field(type => Int)
  ownerId: number;

  @ManyToOne(() => Owner, owner => owner.orders)
  @Field(type => Owner)
  owner: Owner;

  @ManyToOne(() => Employee, employee => employee.id, { onDelete: 'RESTRICT', onUpdate: 'CASCADE', eager: true, nullable: false })
  @JoinColumn()
  @Field(type => Employee)
  employee: Employee;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.orderId)
  @Field(type => [OrderDetail])
  orderDetails: OrderDetail[];
}