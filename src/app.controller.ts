import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './exceptions/custom-exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test-custom-exception')
  async testCustomException() {
    throw new CustomException('Essa é uma exceção personalizada!');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
