/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsUUID } from "class-validator"

export default class CreateEventDto {
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    @IsUUID('4', { each: true})
    guests: string[]
}