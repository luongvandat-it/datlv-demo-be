import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_REDIRECT_URL,
      scope: ['public_profile', 'user:email'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { username, photos, emails } = profile;

    const user = {
      email: emails?.[0].value,
      firstName: username,
      lastName: '',
      picture: photos?.[0].value || '',
      accessToken,
    };

    return user;
  }
}
