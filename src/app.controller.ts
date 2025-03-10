/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/public-strategy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public() 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
