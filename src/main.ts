import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CustomValidationPipe } from './common/pipe/custom-validation.pipe';
import { GlobalExceptionFilter } from './common/helpers/exception-handler.helper';
// import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  

  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  app.useStaticAssets(uploadDir, {
    prefix: '/uploads/',
  });

  // app.enableCors({
  //   origin: ['https://flatwise.tanapps.com', 'http://localhost:8080'],
  //   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  //   credentials: false,
  // });

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new CustomValidationPipe());
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   transform: true,
  //   forbidNonWhitelisted: true,
  // }));
  // app.use(cookieParser());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
