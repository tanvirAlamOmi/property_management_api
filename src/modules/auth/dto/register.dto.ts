import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '@prisma/client';

export class verifyMailDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}

export class VerifyCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}