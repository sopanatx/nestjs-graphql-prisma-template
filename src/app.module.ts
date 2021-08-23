import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthResolver } from './auth/auth.resolver';
import { AppResolver } from './app/app.resolver';
import { ConfigModule } from '@nestjs/config';
import { NODE_ENV, END_POINT } from '@environments';
@Module({
  imports: [
    PrismaService,
    GraphQLModule.forRoot({
      debug: NODE_ENV === 'development' ? true : false,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
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
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService, PrismaService, AuthResolver, AppResolver],
})
export class AppModule {}
