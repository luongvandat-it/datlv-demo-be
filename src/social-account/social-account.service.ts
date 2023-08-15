import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialAccountService {
  create() {
    return 'This action adds a new socialAccount';
  }

  findAll() {
    return `This action returns all socialAccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialAccount`;
  }

  update(id: number) {
    return `This action updates a #${id} socialAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialAccount`;
  }
}
