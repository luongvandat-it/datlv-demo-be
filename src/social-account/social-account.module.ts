import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { OwnerModule } from 'src/owner/owner.module';
import { SocialAccount } from './entities/social-account.entity';
import { SocialAccountController } from './social-account.controller';
import { SocialAccountResolver } from './social-account.resolver';
import { SocialAccountService } from './social-account.service';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { FacebookRelinkStrategy } from './strategy/facebookRelink.strategy';
import { GithubStrategy } from './strategy/github.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleRelinkStrategy } from './strategy/googleRelink.strategy';
import { LinkedinStrategy } from './strategy/linkedin.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialAccount]),
    TypeOrmModule.forFeature([Owner]),
    JwtModule.register({}),
    OwnerModule,
  ],
  providers: [
    SocialAccountResolver,
    SocialAccountService,
    GoogleStrategy,
    FacebookStrategy,
    GoogleRelinkStrategy,
    FacebookRelinkStrategy,
    GithubStrategy,
    LinkedinStrategy,
  ],
  controllers: [SocialAccountController],
})
export class SocialAccountModule {}
