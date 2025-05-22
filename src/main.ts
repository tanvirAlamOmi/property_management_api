import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { CustomValidationPipe } from './common/pipe/custom-validation.pipe';
import { GlobalExceptionFilter } from './common/helpers/exception-handler.helper';
import * as fs from 'fs';
import * as express from 'express';
import { ConfigService } from '@nestjs/config';
import { NoCacheInterceptor } from './common/intercepters/no-cache.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  
  const configService = app.get(ConfigService);

  const uploadDir = join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // app.useStaticAssets(uploadDir, {
  //   prefix: '/api/v1/uploads',
  // });

  app.use('/api/v1/uploads', express.static(uploadDir));

  app.enableCors();

  app.setGlobalPrefix(configService.get<string>('API_PREFIX', 'api/v1'));

  app.useGlobalInterceptors(new NoCacheInterceptor());

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(new CustomValidationPipe());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
