import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseHelper {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  static error(message: string): ApiResponse<null> {
    return {
      success: false,
      error: message,
    };
  }
}