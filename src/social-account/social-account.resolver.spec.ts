import { Test, TestingModule } from '@nestjs/testing';
import { SocialAccountResolver } from './social-account.resolver';
import { SocialAccountService } from './social-account.service';

describe('SocialAccountResolver', () => {
  let resolver: SocialAccountResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialAccountResolver, SocialAccountService],
    }).compile();

    resolver = module.get<SocialAccountResolver>(SocialAccountResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
