import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CustomValidationPipe } from './common/pipe/custom-validation.pipe';
import { GlobalExceptionFilter } from './common/helpers/exception-handler.helper';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  

  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // app.useStaticAssets(uploadDir, {
  //   prefix: '/api/v1/uploads',
  // });

  app.use('api/v1/uploads', express.static(uploadDir));

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new CustomValidationPipe());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
