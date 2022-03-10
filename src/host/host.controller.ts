import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':localhost' })
export class HostController {
  @Get()
  getInfo(@HostParam('localhost') localhost: string) {
    console.log(localhost);
    return localhost;
  }
}
