import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { OwnerService } from 'src/owner/owner.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnerService) { }

    async createPet(createPetInput: CreatePetInput) {
        const newPet = await this.petsRepository.create(createPetInput);
        newPet.owner = await this.getOwner(createPetInput.ownerId);
        return await this.petsRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]> {
        return await this.petsRepository.find();
    }

    findOne(id: number) {
        return this.petsRepository.findOneOrFail({
            where: {
                id: id
            }
        });
    }

    async getOwner(ownerId: number): Promise<Owner> {
        return await this.ownersService.findOne(ownerId);
    }

    async update(id: number, updatePetInput: UpdatePetInput) {
        const updatedPet = await this.petsRepository.create(updatePetInput);
        return await this.petsRepository.save(updatedPet);
    }

    async remove(id: number): Promise<Pet> {
        try {
            const petToRemove = await this.petsRepository.findOneOrFail({
                where: {
                    id: id
                }
            });

            const deletedPet = { ...petToRemove };
            await this.petsRepository.remove(petToRemove);
            return deletedPet;
        } catch (error) {
            throw new Error("Pet not found");
        }
    }
}