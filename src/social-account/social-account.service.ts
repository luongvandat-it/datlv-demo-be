import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { SocialAccount } from './entities/social-account.entity';

@Injectable()
export class SocialAccountService {
  constructor(
    @InjectRepository(SocialAccount)
    private socialAccountRepository: Repository<SocialAccount>,
    private ownerService: OwnerService,
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
  ) {}

  async loginGoogle(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const socialAccountGoogleExist = await this.socialAccountRepository.findOne(
      {
        where: { email: req.user.email },
      },
    );

    if (socialAccountGoogleExist) {
      return socialAccountGoogleExist;
    } else {
      const owner = {
        name: req.user.firstName + ' ' + req.user.lastName,
        email: req.user.email,
        password: Math.random().toString(36).slice(-8),
      };

      const checkExistOwner = await this.ownerRepository.exist({
        where: { email: owner.email },
      });

      if (!checkExistOwner) {
        await this.ownerService.create(owner);
      }
      // sleep 2 seconds to prevent data missing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const ownerSaved = await this.ownerService.getOneOwnerByEmail(
        req.user.email,
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

  async loginFacebook(req) {
    if (!req.user) {
      return 'No user from facebook';
    }

    const socialAccountFacebookExist =
      await this.socialAccountRepository.findOne({
        where: {
          provider: 'facebook',
          email: req.user.email,
        },
      });

    if (socialAccountFacebookExist) {
      return socialAccountFacebookExist;
    } else {
      // const owner = {
      //   name: req.user.firstName + ' ' + req.user.lastName,
      //   email: req.user.email,
      //   password: Math.random().toString(36).slice(-8),
      // };

      // const checkExistOwner = await this.socialAccountRepository.findOne({
      //   where: { email: owner.email, provider: "facebook" },
      // });

      // if (!checkExistOwner) {
      //   await this.ownerService.create(owner);
      // }
      // sleep 2 seconds to prevent data missing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const ownerSaved = await this.ownerService.getOneOwnerByEmail(
        req.user.email,
      );

      const socialAccount = {
        provider: `facebook`,
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

  async unlinkConnectGoogle(email: string): Promise<SocialAccount> {
    try {
      const socialAccount = await this.socialAccountRepository.findOne({
        where: {
          email: email,
          provider: 'google',
        },
      });

      if (!socialAccount) {
        throw new Error("Can't find google account to unlink!");
      }

      await this.socialAccountRepository.remove(socialAccount);
      return socialAccount;
    } catch (error) {
      throw new Error('Have error when unlink google account!');
    }
  }

  async unlinkConnectFacebook(email: string): Promise<SocialAccount> {
    try {
      const socialAccount = await this.socialAccountRepository.findOne({
        where: {
          email: email,
          provider: 'facebook',
        },
      });

      if (!socialAccount) {
        throw new Error("Can't find facebook account to unlink!");
      }

      await this.socialAccountRepository.remove(socialAccount);
      return socialAccount;
    } catch (error) {
      throw new Error('Have error when unlink facebook account!');
    }
  }

  async findSocialAccountByOwnerEmail(email: string): Promise<SocialAccount[]> {
    try {
      const socialAccounts = await this.socialAccountRepository.find({
        where: {
          owner: { email: email },
        },
      });
      return socialAccounts;
    } catch (error) {
      throw new Error('Error while fetching social account!');
    }
  }
}
