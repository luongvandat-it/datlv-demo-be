import { Injectable } from '@nestjs/common';
import { CreateCustomerAccountInput } from './dto/create-customer-account.input';
import { UpdateCustomerAccountInput } from './dto/update-customer-account.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAccount } from './entities/customer-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerAccountService {
  constructor(@InjectRepository(CustomerAccount) private customerAccountRepository: Repository<CustomerAccount>) { }
  
  create(createCustomerAccountInput: CreateCustomerAccountInput) {
    const newCustomerAccount = this.customerAccountRepository.create(createCustomerAccountInput);
    return this.customerAccountRepository.save(newCustomerAccount);
  }

  findAll() {
    return this.customerAccountRepository.find();
  }

  findOne(id: number) {
    return this.customerAccountRepository.findOneOrFail({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateCustomerAccountInput: UpdateCustomerAccountInput) {
    const updatedCustomerAccount = this.customerAccountRepository.create(updateCustomerAccountInput);
    return this.customerAccountRepository.save(updatedCustomerAccount);
  }

  remove(id: number) {
    return this.customerAccountRepository.delete(id);
  }
}
