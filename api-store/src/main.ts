import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';

const { APP_PORT } = process.env;

console.log('APP_PORT', APP_PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(APP_PORT || 3000);

  const mainLog = new Logger('main.ts');
  mainLog.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
