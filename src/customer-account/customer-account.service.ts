import { Injectable } from '@nestjs/common';
import { CreateCustomerAccountInput } from './dto/create-customer-account.input';
import { UpdateCustomerAccountInput } from './dto/update-customer-account.input';

@Injectable()
export class CustomerAccountService {
  create(createCustomerAccountInput: CreateCustomerAccountInput) {
    return 'This action adds a new customerAccount';
  }

  findAll() {
    return `This action returns all customerAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerAccount`;
  }

  update(id: number, updateCustomerAccountInput: UpdateCustomerAccountInput) {
    return `This action updates a #${id} customerAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerAccount`;
  }
}
