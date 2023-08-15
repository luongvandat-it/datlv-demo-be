import { Module } from '@nestjs/common';
import { SocialAccountService } from './social-account.service';
import { SocialAccountResolver } from './social-account.resolver';

@Module({
  providers: [SocialAccountResolver, SocialAccountService],
})
export class SocialAccountModule {}
