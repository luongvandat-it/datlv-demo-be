import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SocialAccountService } from './social-account.service';
import { SocialAccount } from './entities/social-account.entity';
import { CreateSocialAccountInput } from './dto/create-social-account.input';
import { UpdateSocialAccountInput } from './dto/update-social-account.input';

@Resolver(() => SocialAccount)
export class SocialAccountResolver {
  constructor(private readonly socialAccountService: SocialAccountService) {}

  @Mutation(() => SocialAccount)
  createSocialAccount(
    @Args('createSocialAccountInput')
    createSocialAccountInput: CreateSocialAccountInput,
  ) {
    return this.socialAccountService.create(createSocialAccountInput);
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
    return this.socialAccountService.update(
      updateSocialAccountInput.id,
      updateSocialAccountInput,
    );
  }

  @Mutation(() => SocialAccount)
  removeSocialAccount(@Args('id', { type: () => Int }) id: number) {
    return this.socialAccountService.remove(id);
  }
}
