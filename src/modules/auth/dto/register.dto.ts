import { IsEmail, IsEnum, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class verifyMailDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsEnum(Role)
  role: Role;
}

export class VerifyCodeDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsString()
  code: string;
}

export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsString()
  code: string;
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/(?=.*[\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])/, {
    message: 'Password must contain at least one number or special character',
  })
  password: string;

  @IsEnum(Role)
  role: Role;
}