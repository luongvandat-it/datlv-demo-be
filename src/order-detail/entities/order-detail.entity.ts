import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class OrderDetail {
  @Field(() => Int)
  @Column({ type: 'int', nullable: false, name: 'order_id', primary: true })
  orderId: number;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, name: 'product_id', primary: true })
  productId: number;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, name: 'quantity' })
  quantity: number;

  @Field(type => Date)
  @CreateDateColumn({ type: 'datetime', name: 'create_at' })
  createAt: Date;

  @Field(type => Date)
  @UpdateDateColumn({ type: 'datetime', name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Order, order => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}