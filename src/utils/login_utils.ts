/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export class LoginUtils {
    async validatePassword (password, user){
        return await bcrypt.compare(password, user.password)
    }
}