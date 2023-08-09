import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccessTokenResponse } from './dto/access-token-response';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { OwnerService } from './owner.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Mutation(() => AccessTokenResponse)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @Query(() => AccessTokenResponse)
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.ownerService.login(email, password);
  }
  @UseGuards(JwtGuard)
  @Query(() => [Owner])
  findAllOwners() {
    return this.ownerService.findAll();
  }

  @Query(() => Owner)
  findOneOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.findOne(id);
  }

  @Mutation(() => Owner)
  updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
    return this.ownerService.update(updateOwnerInput.id, updateOwnerInput);
  }

  @Mutation(() => Owner)
  removeOwner(@Args('id', { type: () => Int }) id: number) {
    return this.ownerService.remove(id);
  }

  @Query(() => Owner)
  async pets(@Args('id', { type: () => Int }) id: number) {
    console.log('id', id);
    return this.ownerService.getPets(id);
  }

  @Query(() => Owner)
  getOneOwner(@Args('email', { type: () => String }) email: string) {
    return this.ownerService.getOneOwnerId(email);
  }
}
