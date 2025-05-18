import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9\W_]).{8,}$/;
    return passwordRegex.test(password);
  }
}