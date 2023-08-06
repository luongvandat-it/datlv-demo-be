import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

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

  @Field()
  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'createAt' })
  createAt: Date;

  @ManyToOne(() => Product, product => product.id)
  product: Product;

  @ManyToOne(() => Order, order => order.id)
  order: Order;
}