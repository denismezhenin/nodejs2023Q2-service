import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('LOCALHOST'),
  port: configService.get('POSTGRES_PORT'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  username: configService.get('POSTGRES_USER'),
  migrations: ['./dist/migrations/**'],
  entities: ['./dist/*/entities/*.ts'],
});
