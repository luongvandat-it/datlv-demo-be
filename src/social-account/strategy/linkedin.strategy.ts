import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: process.env.LINKEDIN_REDIRECT_URL,
      scope: ['profile', 'email'],
      // scope: ['r_liteprofile', 'r_emailaddress'],
      passReqToCallback: true,
    });
  }

  async validate(req, accessToken, refreshToken, profile, done): Promise<any> {
    try {
      const user = {
        email: profile.emails[0].value,
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ')[1],
        picture: profile.photos[0].value,
        accessToken,
        refreshToken,
      };
      console.log(user);
      done(null, user);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException();
    }
  }
}
