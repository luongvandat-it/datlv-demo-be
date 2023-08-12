import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenResponse {
  @Field(() => String)
  accessToken: string;

  @Field(() => Int)
  ownerId: number;
}
