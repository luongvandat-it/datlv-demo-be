import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Owner } from 'src/owner/entities/owner.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'social_account' })
export class SocialAccount {
  @PrimaryGeneratedColumn({ type: 'int', name: 'social_account_id' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'provider' })
  @Field()
  provider: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'social_info',
  })
  @Field()
  socialInfo: string;

  @CreateDateColumn({ type: 'datetime', nullable: true, name: 'start_date' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true, name: 'update_date' })
  @Field()
  updatedAt: Date;

  @ManyToOne(() => Owner, (owner) => owner.socialAccounts)
  @Field(() => Owner)
  owner: Owner;
}
