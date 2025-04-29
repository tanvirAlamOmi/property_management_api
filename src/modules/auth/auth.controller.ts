import { Controller, Post, Body, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { ApiResponse } from '../../common/interfaces/api-response.interface';
import { RegisterDto, VerifyCodeDto, verifyMailDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto, VerifyResetCodeDto, verifyResetMailDto } from './dto/reset-password.dto';
import { LogoutDto } from './dto/logout.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register/initiate')
  async registerInitiate(@Body() dto: verifyMailDto): Promise<ApiResponse<string>> {
    const result = await this.authService.initiateRegister(dto);
    return ResponseHelper.success(result, 'Verification code sent');
  }

  @Public()
  @Post('register/verify')
  async registerVerify(@Body() dto: VerifyCodeDto): Promise<ApiResponse<string>> {
    const result = await this.authService.verifyRegisterCode(dto);
    return ResponseHelper.success(result, 'Verification code validated');
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<ApiResponse<{ token: string }>> {
    const result = await this.authService.registration(dto);
    return ResponseHelper.success(result, 'Registration successful');
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<ApiResponse<{ token: string; refreshToken?: string }>> {
    const result = await this.authService.login(dto);
    return ResponseHelper.success(result, 'Login successful');
  }

  @Post('logout')
  async logout(@Request() req, @Body() dto: LogoutDto): Promise<ApiResponse<string>> {
    const userId = req.user.sub;
    const result = await this.authService.logout(userId, dto.refreshToken);
    return ResponseHelper.success(result, 'Logout successful');
  }

  @Public()
  @Post('reset-password/initiate')
  async forgotPasswordInitiate(@Body() dto: verifyResetMailDto): Promise<ApiResponse<string>> {
    const result = await this.authService.initiateResetPassword(dto);
    return ResponseHelper.success(result, 'Password reset code sent');
  }

  @Public()
  @Post('reset-password/verify')
  async forgotPasswordVerify(@Body() dto: VerifyResetCodeDto): Promise<ApiResponse<string>> {
    const result = await this.authService.verifyResetCode(dto);
    return ResponseHelper.success(result, 'Reset code validated');
  }

  @Public()
  @Post('reset-password')
  async forgotPassword(@Body() dto: ResetPasswordDto): Promise<ApiResponse<string>> {
    const result = await this.authService.ResetPassword(dto);
    return ResponseHelper.success(result, 'Password reset successful');
  }

  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<ApiResponse<{ token: string }>> {
    const result = await this.authService.refreshToken(refreshToken);
    return ResponseHelper.success(result, 'Token refreshed');
  }

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req): Promise<ApiResponse<any>> {
    const userId = req.user.sub;
    const result = await this.authService.profile(userId);
    return ResponseHelper.success(req.user, 'Profile retrieved');
  }
}
