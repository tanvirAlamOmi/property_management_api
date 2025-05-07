import { IsEmail, IsString, IsBoolean, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}