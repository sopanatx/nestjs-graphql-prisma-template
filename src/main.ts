import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { MyLogger } from '@config';
import { HttpExceptionFilter } from '@common';
import { Logger } from '@nestjs/common';
import { PORT } from '@environments';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      preflightContinue: false,
    },
    logger: new MyLogger(),
  });
  // app.use(helmet());

  // NOTE: body parser
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 60, // an hour
      max: 100, // limit each IP to 100 requests per windowMs
      message:
        '⚠️  Too many request created from this IP, please try again after an hour',
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
  Logger.log(`🚀  Server is listening on port ${PORT}`);
}
bootstrap();
