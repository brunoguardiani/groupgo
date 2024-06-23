/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadExists extends HttpException{
    constructor (){
        super(`Invalid username or password.`, HttpStatus.CONFLICT)
    }
 }