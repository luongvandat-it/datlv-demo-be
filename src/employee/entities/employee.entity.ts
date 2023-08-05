import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'name' })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'email' })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false, name: 'password' })
  @Field()
  password: string;

  @Column({ type: 'boolean', default: true, name: 'status_account' })
  @Field(type => Boolean)
  statusAccount: true;

  @CreateDateColumn({ type: 'datetime', name: 'start_date' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'update_date' })
  @Field()
  updatedAt: Date;

  @OneToMany(() => Employee, employee => employee.employees)
  @Field(type => [Employee])
  employees: Employee[];
}