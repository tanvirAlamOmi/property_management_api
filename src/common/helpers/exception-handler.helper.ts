import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { winstonLogger } from '../loggers/winston.logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message || 'Internal server error';

    let errors: any[] = [];

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'errors' in exceptionResponse
    ) {
      // Already formatted by ValidationPipe or thrown manually
      errors = exceptionResponse['errors'].map((err: any) => {
        return err.field
          ? { field: err.field, messages: err.messages }
          : { messages: err.messages };
      });
    } else if (Array.isArray(exceptionResponse?.message)) {
      // Validation errors in array form
      errors = exceptionResponse.message.map((msg: string) => ({
        messages: [msg],
      }));
    } else if (typeof exceptionResponse === 'object') {
      errors = [
        {
          messages: [exceptionResponse.message || 'Unexpected error'],
        },
      ];
    } else {
      errors = [
        {
          messages: [exceptionResponse],
        },
      ];
    }

    winstonLogger.error({
      timestamp: new Date().toISOString(),
      status,
      path: ctx.getRequest().url,
      message: exception.message || 'Unexpected error',
      stack: exception.stack,
    });

    response.status(status).json({
      success: false,
      message: exception.message || 'An error occurred',
      statusCode: status,
      errors,
    });
  }
}
