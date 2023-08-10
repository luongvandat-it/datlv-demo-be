import { Field, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owner/entities/owner.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pet' })
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @Field()
  type: string;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  owner: Owner;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  @Field()
  updatedAt: Date;
}
