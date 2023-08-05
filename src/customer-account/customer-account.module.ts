import { Module } from '@nestjs/common';
import { CustomerAccountService } from './customer-account.service';
import { CustomerAccountResolver } from './customer-account.resolver';

@Module({
  providers: [CustomerAccountResolver, CustomerAccountService]
})
export class CustomerAccountModule {}
