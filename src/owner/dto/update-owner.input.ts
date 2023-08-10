import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@InputType()
export class UpdateOwnerInput {
  @Field(() => Int)
  @IsNotEmpty({ message: 'Id is required!' })
  id: number;

  @Field()
  @IsNotEmpty({ message: 'Name is required!' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Email is not valid!' })
  @IsNotEmpty({ message: 'Email is required!' })
  email: string;

  @Field()
  @IsNotEmpty({
    message:
      'Password is required contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long!',
  })
  @IsStrongPassword(
    {},
    {
      message:
        'Password is required contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long!',
    },
  )
  password: string;
}
