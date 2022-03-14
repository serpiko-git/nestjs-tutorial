import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { AuthToken } from 'src/common/decorators/common.authToken';
import { HttpExceptionFilter } from './HttpExceptionFilter';

// 내장된 HttpException 에러 사용
// HttpsException 을 base로 상속하여 기본 제공하는 Exception 종류는 다음과 같다
// BadRequestException
// UnauthorizedException
// NotFoundException
// ForbiddenException
// NotAcceptableException
// RequestTimeoutException
// ConflictException
// GoneException
// HttpVersionNotSupportedException
// PayloadTooLargeException
// UnsupportedMediaTypeException
// UnprocessableEntityException
// InternalServerErrorException
// NotImplementedException
// ImATeapotException
// MethodNotAllowedException
// BadGatewayException
// ServiceUnavailableException
// GatewayTimeoutException
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
          message: '사용 권한 없음',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // throw 된 HttpException 에 관련된 모든 에러들은 HttpExceptionFilter 에서 처리하게 된다
  // 따라서 조건문에 해당하는 내용이 출력되는게 아니라, HttpExceptionFilter 의 메세지가 반환된다.
  // 실제 각 Exception 별로 에러를 공통화 시킬 수 있다.
  @Get('/common/:code')
  @UseFilters(new HttpExceptionFilter()) // HttpException 메세지가 아니라 HttpExceptionFilter 의 메세지로 반환된다
  executeErrorCommon(@Param('code') code: HttpStatus) {
    if (code >= 200 && code < 400) {
      return 'status ok';
    } else if (code == 403) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Forbidden Error',
          message: '사용 권한 없음',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // Pipes 는 HttpRequest로 넘어온 파라미터나 쿼리 또는 Body를 Validation 해주거나
  // 원시타입을 조작하거나 원하는 타입이 넘어오지 못했을 때 에러를 발생시킬 수 있는 기능을 담당
  /*
    결과
    {
      "statusCode": 400,
      "message": "Validation failed (numeric string is expected)",
      "error": "Bad Request"
    }
  */
  @Get('pipeInstance/:id')
  exPipeInstance(@Param('id', ParseIntPipe) id: number) {
    return `입력 받은 Number: ${id}`;
  }

  // 인스턴스가 아닌 클래스()를 전달하는 경우, 옵션을 같이 전달하여 내장 파이프의 동작을 사용자 정의하려는 경우 유용하다
  /*
    결과
    {
      "statusCode": 406,
      "message": "Validation failed (numeric string is expected)",
      "error": "Not Acceptable"
    }
  */
  @Get('pipeClass/:id')
  exPipesClass(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
    return `입력 받은 Number: ${id}`;
  }

  @Get('auth/token')
  getAuthToken(@AuthToken() token: string) {
    return `HEADER에 입력한 토큰은 ${token} 입니다.`;
  }
}
