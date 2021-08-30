import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthUsernameDto {
  @Field()
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be between 3 and 20 characters' })
  @MaxLength(20, { message: 'Username must be between 3 and 20 characters' })
  username: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(255, { message: 'Password must be less than 255 characters' })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'reCaptcha must be string' })
  reCaptchaToken: string;
}
