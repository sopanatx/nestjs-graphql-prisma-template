import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '@common';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategy/jwt.strategy';
import { jwtConstants } from './constants';
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from '@environments';
import * as fs from 'fs';
@Module({
  imports: [
    JwtModule.register({
      privateKey: fs.readFileSync('./key/Private.key'),
      publicKey: fs.readFileSync('./key/Public.key'),
      signOptions: {
        issuer: 'AUTH_SERVICE',
        subject: 'CORE_SERVICE_AUTH',
        algorithm: 'RS256',
        expiresIn: '1d',
      },
      // signOptions: { expiresIn: '30s' },
    }),
  ],
  providers: [AuthService, AuthResolver, PrismaService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
