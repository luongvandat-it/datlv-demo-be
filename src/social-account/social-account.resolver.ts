import { Args, Mutation, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => SocialAccount)
  async unlinkConnectFacebook(
    @Args('email', { type: () => String }) email: string,
  ) {
    return this.socialAccountService.unlinkConnectFacebook(email);
  }
}
