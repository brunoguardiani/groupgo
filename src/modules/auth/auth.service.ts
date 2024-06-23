/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUtils } from 'src/utils/login_utils';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor (private userService: UserService, private jwtService: JwtService) {}
    
    async signIn(email, password) {
        const user = await this.userService.findOneBy(email);
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
