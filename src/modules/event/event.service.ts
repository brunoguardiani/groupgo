/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository, In } from 'typeorm';
import CreateEventDto from './dto/createEventDto.dto';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { Resend } from 'resend';

@Injectable()
export class EventService {
    private readonly resend: Resend;
    
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        private readonly mailService: MailService
    ){}   
    
    async create(createEventDto: CreateEventDto, user: any): Promise<any> {
        const { name, guests } = createEventDto
        const found_guests = await this.userRepository.findBy({ email: In(guests) })
        if (found_guests.length != guests.length) {
            throw new BadRequestException('Some users does not exist.')
        }
        const emails = found_guests.map(guest => guest.email)
        await this.mailService.sendEmail(
            emails,
            'Hello from GroupGo!',
            '<p>What up! Come and join us!</p>',
          );
        const current_user = await this.userRepository.findOne({ where: { id: user.sub } })
        const event = this.eventRepository.create(
            { 
                name:name,
                guests:found_guests,
                admin: current_user
            }
        )
        const savedEvent = await this.eventRepository.save(event)
        return{
            id: savedEvent.id,
            name: savedEvent.name
        } 
    }

    async listEvents(name: string, user: any) {
        const e_guests_query = this.eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect('event.guests', 'guest')

        const e_admin_query = this.eventRepository
                .createQueryBuilder('event')
                .leftJoinAndSelect('event.admin', 'admin')

        if (name){
            e_guests_query.andWhere('event.name = :name', { name })
            e_admin_query.andWhere('event.name = :name', { name })
        }

        e_guests_query.andWhere('guest.id = :userId', { userId: user.sub })

        e_admin_query.andWhere('admin.id = :userId', { userId: user.sub })

        const [ guestEvents, managedEvents ] = await Promise.all([
            e_guests_query.getMany(),
            e_admin_query.getMany()
        ])
        return { managedEvents, guestEvents }
    }
}
