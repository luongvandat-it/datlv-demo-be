import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { SocialAccount } from './entities/social-account.entity';

@Injectable()
export class SocialAccountService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(SocialAccount)
    private socialAccountRepository: Repository<SocialAccount>,
    private ownerService: OwnerService,
  ) {}

  async loginGoogle(req, linkNewAccount: boolean): Promise<Owner> {
    const socialAccountGoogleExist = await this.socialAccountRepository.findOne(
      {
        where: { email: req.user.email, provider: 'google' },
      },
    );

    if (socialAccountGoogleExist) {
      if (linkNewAccount === true)
        throw new Error('This account is already linked with another account!');
      else {
        const ownerAndSocialAccounts =
          await this.ownerService.getSocialAccountsByOwnerEmail(req.user.email);
        return ownerAndSocialAccounts;
      }
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
      // sleep 0.5 seconds to prevent data missing
      await new Promise((resolve) => setTimeout(resolve, 500));
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
      // sleep 0.5 seconds to prevent data missing
      await new Promise((resolve) => setTimeout(resolve, 500));

      const ownerAndSocialAccounts =
        await this.ownerService.getSocialAccountsByOwnerEmail(req.user.email);

      return ownerAndSocialAccounts;
    }
  }

  async loginFacebook(req) {
    if (!req.user) {
      return 'No user from facebook';
    }

    const socialAccountFacebookExist =
      await this.socialAccountRepository.findOne({
        where: { email: req.user.email, provider: 'facebook' },
      });

    if (socialAccountFacebookExist) {
      const ownerAndSocialAccounts =
        await this.ownerService.getSocialAccountsByOwnerEmail(req.user.email);
      return ownerAndSocialAccounts;
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

      // sleep 0.5 seconds to prevent data missing
      await new Promise((resolve) => setTimeout(resolve, 500));
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
      // sleep 0.5 seconds to prevent data missing
      await new Promise((resolve) => setTimeout(resolve, 500));

      const ownerAndSocialAccounts =
        await this.ownerService.getSocialAccountsByOwnerEmail(req.user.email);

      return ownerAndSocialAccounts;
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

  async relinkGoogleAccount(ownerEmail: string, req) {
    const existingSocialAccount = await this.socialAccountRepository.findOne({
      where: {
        email: req.user.email,
        provider: 'google',
      },
    });

    if (existingSocialAccount) {
      // return object for show in frontend
      const ownerAndSocialAccounts =
        await this.ownerService.getSocialAccountsByOwnerEmail(ownerEmail);
      return ownerAndSocialAccounts;
      // throw Error("This account is already linked!")
      // return {"statusCode":401,"message":"This account is already linked!"}
    }

    const owner = await this.ownerRepository.findOneOrFail({
      where: {
        email: ownerEmail,
      },
    });

    const socialAccount = {
      provider: 'google',
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
      owner: owner,
    };
    await this.socialAccountRepository.save(socialAccount);

    // sleep 0.5 seconds to prevent data missing
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ownerAndSocialAccounts =
      await this.ownerService.getSocialAccountsByOwnerEmail(ownerEmail);
    return ownerAndSocialAccounts;
  }

  async relinkFacebookAccount(ownerEmail: string, req) {
    const existingSocialAccount = await this.socialAccountRepository.findOne({
      where: {
        email: req.user.email,
        provider: 'facebook',
      },
    });

    if (existingSocialAccount) {
      // return object for show in frontend
      const ownerAndSocialAccounts =
        await this.ownerService.getSocialAccountsByOwnerEmail(ownerEmail);
      return ownerAndSocialAccounts;
      // throw Error("This account is already linked!")
      // return {"statusCode":401,"message":"This account is already linked!"}
    }

    const owner = await this.ownerRepository.findOneOrFail({
      where: {
        email: ownerEmail,
      },
    });

    const socialAccount = {
      provider: 'facebook',
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
      owner: owner,
    };
    await this.socialAccountRepository.save(socialAccount);

    // sleep 0.5 seconds to prevent data missing
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ownerAndSocialAccounts =
      await this.ownerService.getSocialAccountsByOwnerEmail(ownerEmail);
    return ownerAndSocialAccounts;
  }

  // this function error
  linkConnectGoogle(email: string, req): Promise<SocialAccount> {
    try {
      const socialAccount = {
        provider: `google`,
        email: email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        accessToken: req.user.accessToken,
      };
      return this.socialAccountRepository.save(socialAccount);
    } catch (error) {
      throw new Error('Have error when link google account!');
    }
  }

  async relinkConnectSoccialAccount(ownerEmail: string, provider: string, req) {
    const existingSocialAccount =
      await this.socialAccountRepository.findOneOrFail({
        where: {
          email: req.user.email,
          provider: provider,
        },
      });

    if (existingSocialAccount) {
      throw Error('This account is already linked!');
    }

    const socialAccount = {
      provider: provider,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };
    await this.socialAccountRepository.save(socialAccount);
    // sleep 0.5 seconds to prevent data missing
    await new Promise((resolve) => setTimeout(resolve, 500));

    const ownerAndSocialAccounts =
      await this.ownerService.getSocialAccountsByOwnerEmail(ownerEmail);
    return ownerAndSocialAccounts;
  }
}
