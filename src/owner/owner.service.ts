import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) { }

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
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
}