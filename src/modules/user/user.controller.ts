/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create_user.dto';
import { Public } from '../auth/public-strategy';
import ReturnUserDto from './dto/return_created_user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Public()
    create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto>{
        return this.userService.create(createUserDto)
    }
}