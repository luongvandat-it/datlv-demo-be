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

  @Column({ type: 'varchar', length: 20, nullable: false, name: 'provider' })
  @Field(() => String)
  provider: string;

  @Column({ type: 'varchar', length: 100, name: 'email' })
  @Field(() => String)
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'first_name',
  })
  @Field(() => String)
  firstName: string;

  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  @Field(() => String)
  lastName: string;

  @Column({ type: 'varchar', name: 'picture' })
  @Field(() => String)
  picture: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'access_token',
  })
  @Field(() => String)
  accessToken: string;

  @CreateDateColumn({ type: 'datetime', name: 'start_date' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'update_date' })
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Owner, (owner) => owner.socialAccounts)
  @Field(() => Owner)
  owner: Owner;
}
