import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseHelper {
static success<T>(data: T, message: string, meta?: any): ApiResponse<T> {
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message,
      data,
      meta,
    };
  }

  static error(message: string, error: string = 'BadRequest', statusCode: number = HttpStatus.BAD_REQUEST): ApiResponse<null> {
    return {
      success: false,
      statusCode,
      message,       
      error,         
    };
  }
}