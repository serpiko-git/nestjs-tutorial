import { Controller, Get, HttpException, HttpStatus, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './HttpExceptionFilter';

// 내장된 Http Exception 에러 사용
@Controller('except')
export class ExceptController {
  @Get('/manual/:code')
  executeErrorManual(@Param('code') code: HttpStatus) {
    if (code >= 200 && code < 400) {
      return 'status ok';
    } else if (code == 403) {
      // 메시지는 아래와 같이 커스텀하게 담을 수 있다
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden Error',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // throw 된 HttpException 에 관련된 모든 에러들은 HttpExceptionFilter 에서 처리하게 된다
  // 따라서 조건문에 해당하는 내용이 출력되는게 아니라, HttpExceptionFilter 의 메세지가 반환된다.
  // 실제 각 Exception 별로 에러를 공통화 시킬 수 있다.

  @Get('/common/:code')
  @UseFilters(new HttpExceptionFilter())
  executeErrorCommon(@Param('code') code: HttpStatus) {
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
