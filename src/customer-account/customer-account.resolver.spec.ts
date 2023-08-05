import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAccountResolver } from './customer-account.resolver';
import { CustomerAccountService } from './customer-account.service';

describe('CustomerAccountResolver', () => {
  let resolver: CustomerAccountResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAccountResolver, CustomerAccountService],
    }).compile();

    resolver = module.get<CustomerAccountResolver>(CustomerAccountResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
