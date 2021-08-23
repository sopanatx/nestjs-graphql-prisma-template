import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
