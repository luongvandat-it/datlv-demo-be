import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAccountResolver } from './customer-account.resolver';
import { CustomerAccountService } from './customer-account.service';
import { CustomerAccount } from './entities/customer-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAccount])],
  providers: [CustomerAccountResolver, CustomerAccountService]
})
export class CustomerAccountModule { }