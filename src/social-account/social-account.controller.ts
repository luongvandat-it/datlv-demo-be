import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SocialAccountService } from './social-account.service';

@Controller('google')
export class SocialAccountController {
  constructor(private readonly socialAccountService: SocialAccountService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const data = await this.socialAccountService.loginGoogle(req);
    try {
      const jsonData = JSON.stringify(data);
      const redirectUrl = `http://localhost:5501/html/home.html?data=${encodeURIComponent(
        jsonData,
      )}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('An error occurred:', error);
      res
        .status(500)
        .json({ error: 'An error occurred during authentication' });
    }
  }
}
