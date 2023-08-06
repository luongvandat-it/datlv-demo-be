import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@ObjectType()
@Entity('category')
export class Category {
  @Field(type => Int)
  @PrimaryGeneratedColumn({ type: 'int', name: 'category_id' })
  id: number;

  @Field(type => String)
  @Column({ type: 'nvarchar', length: 255, nullable: false, name: 'name' })
  name: string;

  @Field(type => String)
  @Column({ type: 'nvarchar', length: 255, nullable: true, name: 'description' })
  description: string;

  @Field(type => Date)
  @CreateDateColumn({ type: 'datetime', name: 'create_at' })
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn({ type: 'datetime', name: 'update_at' })
  updatedAt: Date;

  @OneToMany(() => Product, product => product.category)
  @Field(type => [Product])
  products: Product[];
}