/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginUtils } from 'src/utils/login_utils';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import LoginDto from './dto/auth_login.dto';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService) {}
    
    async signIn(loginDto: LoginDto) {
        const { login, password } = loginDto;
        if (!login) {
            throw new BadRequestException('Login wasnt informed.');
        }        
        const user = await this.userService.findOneBy(login);
        if (!user){
            throw new NotFoundException()
        }
        const login_utils = new LoginUtils()
        if (!login_utils.validatePassword(password, user)){
            throw new UnauthorizedException()
        }
        const payload = { sub: user.id, email: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

}
