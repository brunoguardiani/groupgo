/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { Event } from './entities/event.entity';
import { MailService } from '../mail/mail.service';


@Module({
    imports: [TypeOrmModule.forFeature([Event, User]), UserModule],
    controllers: [EventController],
    providers: [EventService, MailService],
})

export class EventModule {}
