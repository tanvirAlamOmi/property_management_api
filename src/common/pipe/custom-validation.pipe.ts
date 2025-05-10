import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,  
      },
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints || {}),
        }));

        return new BadRequestException({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
          statusCode: 400,
        });
      },
    });
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    // Exclude 'images' field from validation
    // if (metadata.type === 'body' && value && typeof value === 'object') {
    //   const { images, ...rest } = value;
    //   return super.transform(rest, metadata);
    // }
    return super.transform(value, metadata);
  }
}
