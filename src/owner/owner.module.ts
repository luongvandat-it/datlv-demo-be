import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { OwnerResolver } from './owner.resolver';
import { OwnerService } from './owner.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Owner]),JwtModule.register({})],
  providers: [OwnerResolver, OwnerService],
  exports: [OwnerService]
})
export class OwnerModule { }