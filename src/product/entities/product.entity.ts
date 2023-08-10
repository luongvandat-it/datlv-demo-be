import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'product_id' })
  @Field()
  id: number;

  @Field()
  @Column({ type: 'nvarchar', length: 255, nullable: false, name: 'name' })
  name: string;

  @Field()
  @Column({ type: 'nvarchar', length: 255, name: 'description' })
  description: string;

  @Field()
  @Column({ type: 'float', nullable: false, name: 'price' })
  price: number;

  @Field()
  @Column({ type: 'nvarchar', length: 255, name: 'image' })
  image: string;

  @Field()
  @Column({ type: 'boolean', default: true, name: 'status' })
  status: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @Field()
  category: Category;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'create_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', name: 'update_at' })
  updatedAt: Date;
}
