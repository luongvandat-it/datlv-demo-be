import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owner/entities/owner.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class CustomerAccount {
  // @PrimaryGeneratedColumn({ type: 'int', name: 'customer_account_id' })
  // @Field(type => Int)
  // id: number;

  @Field(type => Int)
  @Column({ type: 'int', nullable: false, name: 'points', default: 0 })
  points: number;

  @Field(type => String)
  @Column({ type: 'varchar', length: 100, nullable: false, name: 'level' })
  level: string;

  @Field(type => Date)
  @CreateDateColumn({ type: 'datetime', nullable: false, name: 'start_date' })
  createdAt: Date;

  @Field(type => Date)
  @UpdateDateColumn({ type: 'datetime', nullable: false, name: 'update_date' })
  updatedAt: Date;

  @PrimaryColumn({ type: 'int', nullable: false, name: 'owner_id' })
  @Field(type => Int)
  id: number;

  @OneToOne(() => Owner)
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;
}