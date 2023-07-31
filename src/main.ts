import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFileSync } from 'fs';
import { AlbumModule } from './album/album.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<ConfigService>(ConfigService);
  const port = appConfig.get('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const yamlDoc = load(readFileSync('doc/api.yaml', 'utf8'));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home service')
    .setDescription('Home service API description')
    .setVersion('1.0')
    .build();


  const document = SwaggerModule.createDocument(app, swaggerConfig, yamlDoc);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port || 4001);
}

bootstrap();
