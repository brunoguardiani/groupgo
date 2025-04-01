/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    ConfigModule, // Allows using environment variables
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAILGUN_HOST'),
          port: configService.get<number>('MAILGUN_PORT', 587),
          auth: {
            user: configService.get<string>('MAILGUN_USER'),
            pass: configService.get<string>('MAILGUN_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('MAILGUN_FROM', 'noreply@example.com'),
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}