import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
@Entity('product')
export class Product {
  @PrimaryGeneratedColumn({ type: 'int', name: 'product_id' })
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  @Column({ type: 'nvarchar', length: 255, nullable: false, name: 'name' })
  name: string;

  @Field(type => String)
  @Column({ type: 'nvarchar', length: 255, name: 'description' })
  description: string;

  @Field(type => Float)
  @Column({ type: 'float', nullable: false, name: 'price' })
  price: number;

  @Field(type => String)
  @Column({ type: 'nvarchar', length: 255, name: 'image' })
  image: string;

  @Field(type => Boolean)
  @Column({ type: 'boolean', default: true, name: 'status' })
  status: boolean;

  @ManyToOne(() => Category, category => category.products)
  @Field(type => Category)
  category: Category;

  @Field(type => Date)
  @CreateDateColumn({ type: 'datetime', name: 'create_at' })
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn({ type: 'datetime', name: 'update_at' })
  updatedAt: Date;
}