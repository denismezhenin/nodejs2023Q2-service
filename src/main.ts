import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  const port = appConfig.get('PORT');
  const file = await readFile('doc/api.yaml', 'utf8');
  const yamlDoc = yaml.load(file);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  SwaggerModule.setup('doc', app, yamlDoc);
  await app.listen(port || 4000);
}
bootstrap();
