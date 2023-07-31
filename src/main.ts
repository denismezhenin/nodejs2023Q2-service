import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  const port = appConfig.get('PORT');
  const file = await readFile('doc/api.yaml', 'utf8');
  const yamlDoc = load(file);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  SwaggerModule.setup('api', app, yamlDoc);
  await app.listen(port || 4000);
}
bootstrap();
