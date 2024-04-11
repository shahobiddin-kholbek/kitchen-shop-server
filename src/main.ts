import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { urlencoded, json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(cors());
  await app.listen(5001);
}
bootstrap();
  