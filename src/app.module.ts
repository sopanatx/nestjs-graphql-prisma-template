import { Module } from '@nestjs/common';
import { PrismaService } from '@common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthResolver } from './auth/auth.resolver';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENV, END_POINT } from '@environments';
import { AuthService } from './auth/auth.service';
import { AppResolver } from './app/app.resolver';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: NODE_ENV === 'development' ? true : false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
      introspection: NODE_ENV === 'development' ? true : false,
      bodyParserConfig: { limit: '50mb' },
      tracing: NODE_ENV !== 'production',
      cacheControl: NODE_ENV === 'production' && {
        defaultMaxAge: 5,
        stripFormattedExtensions: false,
        calculateHttpHeaders: false,
      },
      uploads: {
        maxFieldSize: 2, // 1mb
        maxFileSize: 20, // 20mb
        maxFiles: 5,
      },
      path: END_POINT,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'th',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [],
  providers: [AuthResolver, AuthService, AppResolver, PrismaService],
})
export class AppModule {}
