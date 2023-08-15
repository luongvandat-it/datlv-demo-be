import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities/order.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { SocialAccount } from 'src/social-account/entities/social-account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'owner' })
export class Owner {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'email' })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'image' })
  @Field()
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'password' })
  @Field()
  password: string;

  @Column({ type: 'boolean', default: true, name: 'status_account' })
  @Field()
  statusAccount: true;

  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'startDate' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true, name: 'updateDate' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Pet, (pet) => pet.owner)
  @Field(() => [Pet])
  pets: Pet[];

  @OneToMany(() => Order, (order) => order.owner)
  @Field(() => [Order])
  orders: Order[];

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.owner)
  @Field(() => [SocialAccount])
  socialAccounts: SocialAccount[];
}
