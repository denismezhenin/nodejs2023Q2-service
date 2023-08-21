import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';
import { MyLoggerService } from './logging/logger.service';
import { HttpExceptionFilter } from './exception-filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const myLogger = app.get(MyLoggerService);
  app.useLogger(myLogger);
  app.useGlobalFilters(new HttpExceptionFilter(myLogger));

  process.on('uncaughtException', (error) => {
    myLogger.error(`Uncaught Exception', ${error.stack}`);
  });

  process.on('unhandledRejection', (reason: Error) => {
    myLogger.error(`Unhandled Rejection', ${reason.stack}`);
  });

  const appConfig = app.get<ConfigService>(ConfigService);
  const port = appConfig.get('PORT');
  const file = await readFile('doc/api.yaml', 'utf8');
  const yamlDoc = yaml.load(file);
  SwaggerModule.setup('doc', app, yamlDoc);
  await app.listen(port || 4000);
}
bootstrap();
