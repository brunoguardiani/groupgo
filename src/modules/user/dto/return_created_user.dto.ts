/* eslint-disable prettier/prettier */
import { UUID } from "crypto";

export default class ReturnUserDto {
    id: UUID;
    username:string;
    email:string;
    name: string;
    nickname: string;
    created_at: Date;
}