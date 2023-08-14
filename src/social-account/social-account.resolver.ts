import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SocialAccount } from './entities/social-account.entity';
import { SocialAccountService } from './social-account.service';

@Resolver()
export class SocialAccountResolver {
  constructor(private readonly socialAccountService: SocialAccountService) {}

  @Mutation(() => SocialAccount)
  async unlinkConnectGoogle(
    @Args('email', { type: () => String }) email: string,
  ) {
    return this.socialAccountService.unlinkConnectGoogle(email);
  }

  @Query(() => [SocialAccount])
  async getSocialAccountByEmail(
    @Args('email', { type: () => String }) email: string,
  ) {
    return this.socialAccountService.findSocialAccountByOwnerEmail(email);
  }
}
