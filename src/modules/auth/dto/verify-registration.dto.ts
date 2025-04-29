import { IsEmail, IsString } from 'class-validator';

export class VerifyRegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  password: string;
}