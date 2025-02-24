/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public-strategy';
import LoginDto from './dto/auth_login.dto';

@Controller()
export class AuthController {
    constructor (private authService: AuthService) {};

    @Public()
    @Post('login')
    signIn(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto);
    }

}
