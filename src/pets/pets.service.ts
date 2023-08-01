import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) { }
    
    async createPet(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = await this.petsRepository.create(createPetInput);

        return await this.petsRepository.save(newPet);
    }


    async findAll(): Promise<Pet[]> {
        return await this.petsRepository.find();
    }
}