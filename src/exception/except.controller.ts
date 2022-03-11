import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
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

  // Pipes 는 HttpRequest로 넘어온 파라미터나 쿼리 또는 Body를 Validation 해주거나
  // 원시타입을 조작하거나 원하는 타입이 넘어오지 못했을 때 에러를 발생시킬 수 있는 기능
  @Get('pipe/:id')
  exPipes(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return `입력 받은 Number: ${id}`;
  }
}
