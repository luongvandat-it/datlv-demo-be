import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { RecaptchaGuard } from './guard/recaptcha.guard';
import { OwnerResolver } from './owner.resolver';
import { OwnerService } from './owner.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner]),
    JwtModule.register({}),
    HttpModule,
  ],
  providers: [OwnerResolver, OwnerService, RecaptchaGuard],
  exports: [OwnerService, RecaptchaGuard],
})
export class OwnerModule {}
