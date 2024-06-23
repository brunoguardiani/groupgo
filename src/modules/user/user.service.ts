/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import CreateUserDto from './dto/create_user.dto';
import * as bcrypt from 'bcrypt';
import ReturnUserDto from './dto/return_created_user.dto';
import { UserAlreadExists } from 'src/exceptions/create_exception';

@Injectable()
export class UserService {
    private readonly saltRounds = 10

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        const { password, username, email} = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const userAlreadyExists = await this.userRepository.findOne({
            where:{
                username: username,
                email: email
            }
        })
        if (userAlreadyExists) {
            throw new UserAlreadExists()
        }
        const user = this.userRepository.create({username, email, password: hashedPassword });
        const savedUser = await this.userRepository.save(user);
    
        return {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
        };
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async findOneBy (key: any) {
        const options: FindOneOptions<User> = {
            where: [
              { id: key },
              { username: key },
              { email: key },
            ],
          };
        return this.userRepository.findOne(options)
    }
}
