import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: MyLoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const {body, query, originalUrl} = req
    res.on('finish', () => {
      this.logger.log(`request: {url: ${originalUrl}, body: ${JSON.stringify(body)}, query parameters: ${JSON.stringify(query)}}, response status code: ${res.statusCode}`);
    })
    if (next) {
      next();
    }
  }
}
