import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SocialAccountService } from './social-account.service';

@Controller('')
export class SocialAccountController {
  constructor(private readonly socialAccountService: SocialAccountService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const data = await this.socialAccountService.loginGoogle(req, false);
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

  @Get('/googlerelink')
  @UseGuards(AuthGuard('googlerelink'))
  async googleAuthRelink() {}

  @Get('/googlerelink/relink')
  @UseGuards(AuthGuard('googlerelink'))
  async googleAuthRelinkAccount(@Req() req, @Res() res: Response) {
    const data = await this.socialAccountService.relinkGoogleAccount(
      'vfa.internship.datlv@gmail.com',
      req,
    );
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
    console.log(data);
    return data;
  }

  @Get('/facebookrelink')
  @UseGuards(AuthGuard('facebookrelink'))
  async facebookAuthRelink() {}

  @Get('/facebookrelink/relink')
  @UseGuards(AuthGuard('facebookrelink'))
  async facebookAuthRelinkAccount(@Req() req, @Res() res: Response) {
    const data = await this.socialAccountService.relinkFacebookAccount(
      'vfa.internship.datlv@gmail.com',
      req,
    );
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
    console.log(data);
    return data;
  }

  // @Get('/google/relink')
  // @UseGuards(AuthGuard('google'))
  // async relinkConnectSoccialAccount(@Req() req, @Res() res: Response) {
  //   const data = await this.socialAccountService.loginGoogle(req, true);
  //   try {
  //     const jsonData = JSON.stringify(data);
  //     const redirectUrl = `http://localhost:5501/html/home.html?data=${encodeURIComponent(
  //       jsonData,
  //     )}`;
  //     res.redirect(redirectUrl);
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     res
  //       .status(500)
  //       .json({ error: 'An error occurred during authentication' });
  //   }
  // }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const data = await this.socialAccountService.loginFacebook(req);
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
