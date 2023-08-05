import { Module } from '@nestjs/common';
import { CustomerAccountService } from './customer-account.service';
import { CustomerAccountResolver } from './customer-account.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAccount } from './entities/customer-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAccount])],
  providers: [CustomerAccountResolver, CustomerAccountService]
})
export class CustomerAccountModule {}
