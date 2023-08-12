import { Resolver } from '@nestjs/graphql';
import { SocialAccount } from './entities/social-account.entity';
import { SocialAccountService } from './social-account.service';

@Resolver(() => SocialAccount)
export class SocialAccountResolver {
  constructor(private readonly socialAccountService: SocialAccountService) {}
}
