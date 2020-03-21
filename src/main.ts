import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = process.env.APP_HOST || 'localhost';
  const port = process.env.APP_PORT || 80;
  app.use(cookieParser());
  await app.listen(port, () =>
  console.info(`
  API server is listening on:
  \x1b[34m${host}:${port}/\x1b[35mgraphql\x1b[0m`)
  );
}

bootstrap();