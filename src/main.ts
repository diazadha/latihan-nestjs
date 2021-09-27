import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';

const port = parseInt(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule, { cors: true }
  );
  // app.enableCors({
  //   origin:"http://akusuka.com",
  //   methods:
  // })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(port);
  Logger.log(`Jalan pada port ${port}`, 'Runnig Port');
}
bootstrap();
