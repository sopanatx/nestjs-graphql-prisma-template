import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthResolver } from './auth/auth.resolver';
import { AppResolver } from './app/app.resolver';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PrismaService,
    GraphQLModule.forRoot({
      debug: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      introspection: true,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [AppService, PrismaService, AuthResolver, AppResolver],
})
export class AppModule {}
