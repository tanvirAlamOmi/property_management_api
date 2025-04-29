import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  password: string;
}

export class verifyResetMailDto {
  @IsEmail()
  email: string;
}

export class VerifyResetCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}