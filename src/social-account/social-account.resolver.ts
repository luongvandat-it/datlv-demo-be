import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateSocialAccountInput } from './dto/update-social-account.input';
import { SocialAccount } from './entities/social-account.entity';
import { SocialAccountService } from './social-account.service';

@Resolver(() => SocialAccount)
export class SocialAccountResolver {
  constructor(private readonly socialAccountService: SocialAccountService) {}

  @Mutation(() => SocialAccount)
  createSocialAccount() {
    return this.socialAccountService.create();
  }

  @Query(() => [SocialAccount], { name: 'socialAccount' })
  findAll() {
    return this.socialAccountService.findAll();
  }

  @Query(() => SocialAccount, { name: 'socialAccount' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.socialAccountService.findOne(id);
  }

  @Mutation(() => SocialAccount)
  updateSocialAccount(
    @Args('updateSocialAccountInput')
    updateSocialAccountInput: UpdateSocialAccountInput,
  ) {
    return this.socialAccountService.update(updateSocialAccountInput.id);
  }

  @Mutation(() => SocialAccount)
  removeSocialAccount(@Args('id', { type: () => Int }) id: number) {
    return this.socialAccountService.remove(id);
  }
}
