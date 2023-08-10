import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/guard';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './entities/pet.entity';
import { PetsService } from './pets.service';

@Resolver()
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petsService.createPet(createPetInput);
  }

  @Query(() => [Pet])
  @UseGuards(JwtGuard)
  findAllPets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Query(() => Pet)
  findOnePet(@Args('id', { type: () => Int }) id: number) {
    return this.petsService.findOne(id);
  }

  @Mutation(() => Pet)
  updatePet(
    @Args('updatePetInput') updatePetInput: UpdatePetInput,
  ): Promise<Pet> {
    return this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.remove(id);
  }

  // use service to get owner of a pet input argument is the owner id
  // @ResolveField()
  // async owner(@Parent() pet: Pet): Promise<Owner> {
  //     return this.petsService.getOwner(pet.owner.id);
  // }
}
