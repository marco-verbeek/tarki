import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getAPIMessage(): string {
    return 'API for Tarki Tools';
  }
}
