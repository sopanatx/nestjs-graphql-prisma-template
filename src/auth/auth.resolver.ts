import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthRegisterInput } from '../models/auth/Input/auth-register.dto';
import { AuthUsernameDto } from '../models/auth/Input/auth-username.dto';
import { AuthResponseModel } from '../models/auth/Response/auth-response.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Mutation(() => AuthResponseModel)
  async authUsername(
    @Args('AuthUsernameDto') authUsernameDto: AuthUsernameDto,
  ): Promise<AuthResponseModel> {
    return await this.authService.localLogin(authUsernameDto);
  }
  @Mutation(() => AuthResponseModel)
  async authRegister(
    @Args('AuthRegisterInput') authRegisterInput: AuthRegisterInput,
  ): Promise<AuthResponseModel> {
    return await this.authService.Register(authRegisterInput);
  }
}
