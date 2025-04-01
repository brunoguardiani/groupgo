/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes/app.routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { EventModule } from './modules/event/event.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './modules/mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', }),  // Ensuring the config module is global
    TypeOrmModule.forRoot(typeOrmConfig),  // Assuming typeorm configuration is in ormconfig.json or similar
    RouterModule.register(routes),
    UserModule,
    AuthModule,
    IngredientModule,
    EventModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          port: config.get<number>('SMTP_PORT'),
          secure: true,
          auth: {
            user: config.get<string>('SMTP_USER'),
            pass: config.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: `"GroupGo" <${config.get<string>("SMPT_FROM")}>`, // Use your sender email
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}
