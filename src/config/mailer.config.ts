import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get('MAIL_HOST'),
    port: 465,
    secure: true,
    auth: {
      user: configService.get('MAIL_USER'),
      pass: configService.get('MAIL_PASS'),
    },
  },
  defaults: {
    from:  '"iListed" <flatwisebd@gmail.com>',
  },
  template: {
    dir: join(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});