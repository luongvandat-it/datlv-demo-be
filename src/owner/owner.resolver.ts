import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { OwnerService } from './owner.service';
import { AccessTokenResponse } from './dto/access-token-response';

@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) { }

  @Mutation(() => AccessTokenResponse)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownerService.create(createOwnerInput);
  }

  @Query(() => AccessTokenResponse)
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.ownerService.login(email, password);
  }

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
}