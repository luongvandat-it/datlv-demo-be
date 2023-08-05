import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Field()
  @Column({ type: 'nvarchar', length: 255, nullable: false, name: 'name' })
  name: string;

  @Field()
  @Column({ type: 'int', nullable: false, name: 'price' })
  price: number;

  @Field()
  @Column({ type: 'nvarchar', length: 255, nullable: false, name: 'description' })
  description: string;

  @Field()
  @Column({ type: 'boolean', default: true, name: 'status' })
  status: boolean;

  @Field()
  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'create_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'datetime', nullable: true, name: 'update_at' })
  updatedAt: Date;

  // one to many with orderdetail
  @OneToMany(() => Product, product => product.id)
  @Field(type => [Product])
  products: Product[];
}