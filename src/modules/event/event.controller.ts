/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import CreateEventDto from './dto/createEventDto.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class EventController {
    constructor (private readonly eventService: EventService){}

    @UseGuards(AuthGuard)
    @Post()
    create(@Request() req, @Body() createEventDto: CreateEventDto){
        console.log('@@@@@@@@@@@@@@@@',req.user)
        return this.eventService.create(createEventDto, req.user)
    }

    @Get()
    get(@Request() req, @Query('name') name: string) {
        return this.eventService.listEvents(name, req.user)
    }
}
