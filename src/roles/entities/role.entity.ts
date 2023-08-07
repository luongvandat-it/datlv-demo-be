import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, Generated, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToOne(() => Employee, employee => employee.role)
  @Field(() => Employee)
  employee: Relation<Employee>;
}