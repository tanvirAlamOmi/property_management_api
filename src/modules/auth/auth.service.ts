import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { PasswordHelper } from '../../common/helpers/password.helper';
import { Role } from '@prisma/client';
import * as crypto from 'crypto';
import { RegisterDto, VerifyCodeDto, verifyMailDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto, VerifyResetCodeDto, verifyResetMailDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async initiateRegister(dto: verifyMailDto): Promise<string> {
    const { email } = dto;

    if (!this.validateEmail(email)) {
      throw new BadRequestException('Please enter a valid email');
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const code = this.generateVerificationCode();
    await this.prisma.verificationCode.create({
      data: {
        email,
        code,
        type: 'register',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    await this.sendVerificationEmail(email, code);
    return 'Verification code sent to email';
  }

  async verifyRegisterCode(dto: VerifyCodeDto): Promise<string> {
    const { email, code } = dto;

    const verification = await this.prisma.verificationCode.findFirst({
      where: { email, code, type: 'register' },
    });
    
    if (!verification) {
      throw new BadRequestException('The code you entered is incorrect');
    }

    if (verification.expiresAt <= new Date()) {
      throw new BadRequestException('The code you entered has expired');
    }
    return 'Verification code validated';
  }

  async registration(dto: RegisterDto): Promise<{ token: string }> {
    const { email, code, password, role } = dto;
 
    const verification = await this.prisma.verificationCode.findFirst({
      where: { email, code, type: 'register' },
    });
    
    if (!verification) {
      throw new BadRequestException('The code you entered is incorrect');
    }

    if (verification.expiresAt <= new Date()) {
      throw new BadRequestException('The code you entered has expired');
    }

    if (!PasswordHelper.validatePassword(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and contain at least one number or special character',
      );
    }

    const hashedPassword = await PasswordHelper.hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role ,  
      },
    });

    await this.prisma.verificationCode.deleteMany({ where: { email, type: 'register' } });

    const token = await this.generateToken(user.id, user.email, user.role);
    return { token };
  }

  async login(dto: LoginDto): Promise<{ token: string; refreshToken?: string }> {
    const { email, password, rememberMe } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Please enter a valid email');
    }

    const isPasswordValid = await PasswordHelper.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = await this.generateToken(user.id, user.email, user.role);
    const response: { token: string; refreshToken?: string } = { token };

    if (rememberMe) {
      const refreshToken = await this.generateRefreshToken(user.id);
      response.refreshToken = refreshToken;
    }

    return response;
  }

  async logout(userId: number, refreshToken?: string): Promise<string> {
    if (refreshToken) {
      const session = await this.prisma.session.findFirst({
        where: { token: refreshToken, userId },
      });

      if (session) {
        await this.prisma.session.delete({ where: { id: session.id } });
      }
    } else {
      await this.prisma.session.deleteMany({
        where: { userId },
      });
    }

    return 'Logged out successfully';
  }

  async initiateResetPassword(dto: verifyResetMailDto): Promise<string> {
    const { email } = dto;

    if (!this.validateEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const code = this.generateVerificationCode();
    await this.prisma.verificationCode.create({
      data: {
        email,
        code,
        type: 'reset',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    await this.sendVerificationEmail(email, code);
    return 'Reset code sent to email';
  }

  async verifyResetCode(dto: VerifyResetCodeDto): Promise<string> {
    const { email, code } = dto;

    const verification = await this.prisma.verificationCode.findFirst({
      where: { email, code, type: 'register' },
    });
    
    if (!verification) {
      throw new BadRequestException('The code you entered is incorrect');
    }

    if (verification.expiresAt <= new Date()) {
      throw new BadRequestException('The code you entered has expired');
    }

    return 'Reset code validated';
  }

  async ResetPassword(dto: ResetPasswordDto): Promise<string> {
    const { email, code, password } = dto;

    const verification = await this.prisma.verificationCode.findFirst({
      where: { email, code, type: 'register' },
    });
    
    if (!verification) {
      throw new BadRequestException('The code you entered is incorrect');
    }

    if (verification.expiresAt <= new Date()) {
      throw new BadRequestException('The code you entered has expired');
    }

    if (!PasswordHelper.validatePassword(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and contain at least one number or special character',
      );
    }

    const hashedPassword = await PasswordHelper.hashPassword(password);
    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await this.prisma.verificationCode.deleteMany({ where: { email, type: 'reset' } });

    return 'Password reset successfully';
  }
  
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const session = await this.prisma.session.findFirst({
      where: { token: refreshToken, expiresAt: { gt: new Date() } },
      include: { user: true },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const newAccessToken = await this.generateToken(session.user.id, session.user.email, session.user.role);

    const newRefreshToken = await this.generateRefreshToken(session.user.id);

    await this.prisma.session.delete({ where: { id: session.id } });

    return { token: newAccessToken, refreshToken: newRefreshToken };
  }

  private async generateToken(userId: number, email: string, role: Role): Promise<string> {
    const payload = { sub: userId, email, role };
    return this.jwtService.signAsync(payload);
  }

  private async generateRefreshToken(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await this.prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });

    return token;
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async sendVerificationEmail(email: string, code: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verification Code',
      template: 'verification',
      context: { code },
    });
  }

  async profile(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}