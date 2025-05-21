import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '../common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('error')
  throwError() {
    throw new Error('Test error from /test/error route');
  } 
}
