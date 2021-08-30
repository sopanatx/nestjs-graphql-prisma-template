import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseModel {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
  @Field({ nullable: true })
  message: string;
}
