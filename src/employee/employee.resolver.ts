import { Catch, ForbiddenException, HttpException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Resolver(() => Employee)
@Catch(HttpException)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return this.employeeService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'employee' })
  findAll() {
    try {
      this.employeeService.findAll();
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  ) {
    return this.employeeService.update(
      updateEmployeeInput.id,
      updateEmployeeInput,
    );
  }

  @Mutation(() => Employee)
  removeEmployee(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.remove(id);
  }
}
