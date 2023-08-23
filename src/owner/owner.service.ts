import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(createOwnerInput: CreateOwnerInput) {
    const owner = await this.ownersRepository.findOne({
      where: { email: createOwnerInput.email },
    });
    if (owner) {
      throw new UnauthorizedException('Account already exists');
    }

    const hashedPassword = await argon.hash(createOwnerInput.password);
    createOwnerInput.password = hashedPassword;
    const newOwner = await this.ownersRepository.create(createOwnerInput);
    if (!newOwner.image)
      newOwner.image =
        'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png';
    this.ownersRepository.save(newOwner);
    return this.signJwtToken(newOwner.id, newOwner.email);
  }

  async login(email: string, password: string) {
    const owner = await this.ownersRepository.findOne({ where: { email } });
    if (!owner) {
      throw new NotFoundException('Invalid credentials');
    }

    const passwordMatch = await argon.verify(owner.password, password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.signJwtToken(owner.id, owner.email);
  }

  async signJwtToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string; ownerId: number }> {
    const payload = { sub: userId, email };

    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      accessToken: jwtString,
      ownerId: userId,
    };
  }

  findAll() {
    return this.ownersRepository.find();
  }

  async findOneById(id: number): Promise<Owner> {
    const owner = await this.ownersRepository.findOne({
      where: {
        id: id,
      },
    });
    console.log(owner.id);
    return owner;
  }

  findOne(id: number) {
    return this.ownersRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['pets'],
    });
  }

  getOneOwnerByEmail(email: string) {
    return this.ownersRepository.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.ownersRepository.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const owner = await this.ownersRepository.findOne({ where: { id: id } });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const passwordMatch = await argon.verify(
      owner.password,
      updateOwnerInput.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await argon.hash(updateOwnerInput.password);
    updateOwnerInput.password = hashedPassword;
    const updatedOwner = this.ownersRepository.create(updateOwnerInput);
    return this.ownersRepository.save(updatedOwner);
  }

  async remove(id: number) {
    try {
      const ownerToRemove = await this.ownersRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      const deletedOwner = { ...ownerToRemove };
      await this.ownersRepository.remove(ownerToRemove);
      return deletedOwner;
    } catch (error) {
      throw new Error('Owner not found');
    }
  }

  async getPets() {
    const owner = await this.ownersRepository.find({
      relations: { pets: true },
    });
    return owner;
  }

  async getSocialAccountsByOwnerId(ownerId: number) {
    const owner = await this.ownersRepository.findOneOrFail({
      where: { id: ownerId },
      relations: ['socialAccounts'],
    });
    return owner;
  }

  async getAllSocialAccountsOfOneOwner(ownerId: number) {
    const owner = await this.ownersRepository.findOneOrFail({
      where: { id: ownerId },
      relations: ['socialAccounts'],
    });

    delete owner.password;
    delete owner.createdAt;
    delete owner.updatedAt;
    delete owner.statusAccount;
    owner.socialAccounts.forEach((socialAccount) => {
      delete socialAccount.createdAt;
      delete socialAccount.updatedAt;
    });

    return owner;
  }

  async getSocialAccountsByOwnerEmail(email: string) {
    const owner = await this.ownersRepository.findOneOrFail({
      where: { email: email },
      relations: ['socialAccounts'],
    });

    delete owner.password;
    delete owner.createdAt;
    delete owner.updatedAt;
    delete owner.statusAccount;
    owner.socialAccounts.forEach((socialAccount) => {
      delete socialAccount.createdAt;
      delete socialAccount.updatedAt;
    });

    return owner;
  }
}
