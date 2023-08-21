import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLoggerService } from 'src/logging/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
constructor(private logger: MyLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
 

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        status: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
      });
      this.logger.error(`Error: ${exception.name}, ${exception.message}`)
    } else {
      this.logger.error(`Error: ${exception}`)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        message: `Internal sever Error2`,
      });
    }
  }
}