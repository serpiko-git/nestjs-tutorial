import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';

@Controller('except')
export class ExceptController {
  @Get(':code')
  executeError(@Param('code') code: HttpStatus) {
    if (code >= 200 && code < 400) {
      return 'status ok';
    } else if (code == 403) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden Error',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
