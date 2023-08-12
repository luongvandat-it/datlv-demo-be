import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { SocialAccount } from './entities/social-account.entity';

@Injectable()
export class SocialAccountService {
  constructor(
    @InjectRepository(SocialAccount)
    private socialAccountRepository: Repository<SocialAccount>,
    private ownerService: OwnerService,
  ) {}

  async loginGoogle(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const socialAccountExist = await this.socialAccountRepository.findOne({
      where: { email: req.user.email },
    });
    if (socialAccountExist) {
      return socialAccountExist;
    }

    const owner = {
      name: req.user.firstName + ' ' + req.user.lastName,
      email: req.user.email.trim(),
      password: Math.random().toString(36).slice(-8),
    };

    await this.ownerService.create(owner);
    // sleep 2 seconds to prevent data missing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const ownerSaved = await this.ownerService.getOneOwnerByEmail(
      req.user.email.trim(),
    );

    const socialAccount = {
      provider: `google`,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
      accessToken: req.user.accessToken,
      owner: ownerSaved,
    };

    this.socialAccountRepository.save(socialAccount);
    return socialAccount;
  }
}
