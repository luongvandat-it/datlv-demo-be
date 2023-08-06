import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerAccountService } from './customer-account.service';
import { CreateCustomerAccountInput } from './dto/create-customer-account.input';
import { UpdateCustomerAccountInput } from './dto/update-customer-account.input';
import { CustomerAccount } from './entities/customer-account.entity';

@Resolver(() => CustomerAccount)
export class CustomerAccountResolver {
  constructor(private readonly customerAccountService: CustomerAccountService) { }

  @Mutation(() => CustomerAccount)
  createCustomerAccount(@Args('createCustomerAccountInput') createCustomerAccountInput: CreateCustomerAccountInput) {
    return this.customerAccountService.create(createCustomerAccountInput);
  }

  @Query(() => [CustomerAccount], { name: 'customerAccount' })
  findAll() {
    return this.customerAccountService.findAll();
  }

  @Query(() => CustomerAccount, { name: 'customerAccount' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.customerAccountService.findOne(id);
  }

  @Mutation(() => CustomerAccount)
  updateCustomerAccount(@Args('updateCustomerAccountInput') updateCustomerAccountInput: UpdateCustomerAccountInput) {
    return this.customerAccountService.update(updateCustomerAccountInput.id, updateCustomerAccountInput);
  }

  @Mutation(() => CustomerAccount)
  removeCustomerAccount(@Args('id', { type: () => Int }) id: number) {
    return this.customerAccountService.remove(id);
  }
}