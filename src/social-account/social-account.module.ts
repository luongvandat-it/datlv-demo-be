import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerModule } from 'src/owner/owner.module';
import { SocialAccount } from './entities/social-account.entity';
import { SocialAccountController } from './social-account.controller';
import { SocialAccountResolver } from './social-account.resolver';
import { SocialAccountService } from './social-account.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { Owner } from 'src/owner/entities/owner.entity';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialAccount]),
    TypeOrmModule.forFeature([Owner]),
    OwnerModule,
  ],
  providers: [
    SocialAccountResolver,
    SocialAccountService,
    GoogleStrategy,
    FacebookStrategy,
  ],
  controllers: [SocialAccountController],
})
export class SocialAccountModule {}
