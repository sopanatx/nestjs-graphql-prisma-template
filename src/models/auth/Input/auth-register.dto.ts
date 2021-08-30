import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthRegisterInput {
  @Field()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @Field()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  username: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(1000)
  password: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  reCaptchaToken: string;
}
