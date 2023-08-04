import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenResponse {
    @Field(() => String)
    accessToken: string;
}