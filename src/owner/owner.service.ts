import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { Pet } from 'src/pets/entities/pet.entity';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>,
    private jwtService: JwtService,
    private configService: ConfigService) { }

  async create(createOwnerInput: CreateOwnerInput) {
    const owner = await this.ownersRepository.findOne({ where: { email: createOwnerInput.email } });
    if (owner) {
      throw new UnauthorizedException('Account already exists');
    }
    const hashedPassword = await argon.hash(createOwnerInput.password)
    createOwnerInput.password = hashedPassword;
    const newOwner = await this.ownersRepository.create(createOwnerInput);
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

  async signJwtToken(userId: number, email: string): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email }

    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET')
    })

    return {
      accessToken: jwtString
    }
  }

  findAll() {
    return this.ownersRepository.find();
  }

  findOne(id: number) {
    return this.ownersRepository.findOneOrFail({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const updatedOwner = this.ownersRepository.create(updateOwnerInput);
    return this.ownersRepository.save(updatedOwner);
  }

  async remove(id: number) {
    const ownerToRemove = await this.ownersRepository.findOne({
      where: {
        id: id
      }
    });
    return await this.ownersRepository.remove(ownerToRemove);
  }

  // return all pets of an owner
  async getPets(ownerId: number): Promise<Pet[]> {
    const owner = await this.findOne(ownerId);
    return owner.pets;
  }
}