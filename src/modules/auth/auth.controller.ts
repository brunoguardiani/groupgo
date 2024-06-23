/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public-strategy';

@Controller()
export class AuthController {
    constructor (private authService: AuthService) {};

    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.login, signInDto.password);
    }

}
