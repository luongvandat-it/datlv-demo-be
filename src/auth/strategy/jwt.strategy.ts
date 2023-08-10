import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Owner } from 'src/owner/entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, `jwt`) {
  constructor(
    configSerive: ConfigService,
    @InjectRepository(Owner) private readonly ownerService: Repository<Owner>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configSerive.get(`JWT_SECRET`),
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const owner = await this.ownerService.findOne({
      where: {
        id: payload.sub,
      },
    });
    delete owner.password;
    return owner;
  }
}
