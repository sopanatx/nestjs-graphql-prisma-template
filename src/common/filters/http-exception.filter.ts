import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ContextType,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    switch (host.getType() as ContextType | 'graphql') {
      case 'graphql':
        return exception;
      default:
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        res.status(status).send();
        break;
    }
  }
}
