import { BadRequestException } from "@nestjs/common";

export function validationError(field: string, message: string): never {
    throw new BadRequestException({
      success: false,
      message: 'Validation failed',
      statusCode: 400,
      errors: [
        {
          field,
          messages: [message],
        },
      ],
    });
}
  
  