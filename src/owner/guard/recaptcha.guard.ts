import { HttpService } from '@nestjs/axios';
import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(): Promise<boolean> {
    // const { body } = context.switchToHttp().getRequest();

    const { data } = await this.httpService
      .post(
        // `https://www.google.com/recaptcha/api/siteverify?response=${body.recaptchaValue}&secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}`
        `https://www.google.com/recaptcha/api/siteverify?response=6LcKJ7InAAAAACff_YRVOeVyL-b2bHRfX0uPVgH4&secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}`,
      )
      .toPromise();

    if (!data.success) {
      // throw new ForbiddenException();
      console.log(data);
    }

    return true;
  }
}
