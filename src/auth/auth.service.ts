import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@common';
import { AuthRegisterInput } from '../models/auth/Input/auth-register.dto';
import { AuthResponseModel } from '../models/auth/Response/auth-response.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { checkEmailPattern } from '../utils/regex/email';
import { AuthUsernameDto } from '../models/auth/Input/auth-username.dto';
import { JwtStrategy } from './strategy/jwt.strategy';
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async findExistUser(username: string, email: string): Promise<Boolean> {
    // console.log(checkEmailPattern(email));
    const getUser = await this.prisma.user.findMany({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (getUser.length > 0) return true;
    else return false;
  }

  async Register(
    authRegisterInput: AuthRegisterInput,
  ): Promise<AuthResponseModel> {
    const { firstName, lastName, username, email, password } =
      authRegisterInput;

    const isExistUser = await this.findExistUser(username, email);
    if (isExistUser)
      throw new ConflictException(
        'username or email already in use.',
        'USERNAME_ALREADY_IN_USED',
      );
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password: hash,
        salt,
        email,
      },
    });

    const payload = await this.jwtService.sign({
      userId: user.id,
      username: user.username,
    });
    return {
      accessToken: payload,
      refreshToken: '',
      message: 'LOGIN_SUCCESS',
    };
  }

  async localLogin(
    authUsernameDto: AuthUsernameDto,
  ): Promise<AuthResponseModel> {
    const { username, password, email } = authUsernameDto;
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (!user)
      throw new NotFoundException('User not found', 'USER_DOES_NOT_EXIST');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      throw new UnauthorizedException('Invalid password', 'INCORRECT_PASSWORD');
    if (user.isDeleted)
      throw new UnauthorizedException('User is deleted', 'USER_IS_DELETED');
    if (user.isSuspended)
      throw new UnauthorizedException('User is suspended', 'USER_IS_SUSPENDED');
    const payload = await this.jwtService.sign({
      userId: user.id,
      username: user.username,
    });
    return {
      accessToken: payload,
      refreshToken: '',
      message: 'LOGIN_SUCCESS',
    };
  }
}
