import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

// src/exception/except.controller.ts 에서는 HttpException을 토대로 throw 한 에러를 직접 설정하였다
// ExceptionFilter 는 데코레이터를 해당 ExceptionFilter의 객체에 주입하여 response 체계를 공통으로 처리할 수 있는 코드를 작성해 본다.
// 콘트롤러에서 HttpExceptionFilter 를 사용하고자 하는 컨트롤러의 Route 에서 UseFilters 라는 데코레이터를 이용하여 사용할 수 있다.

// catch 데코레이터를 사용하여 HttpException 관련 에러를 catch 하겠다는 선언
// ExceptionFilter 인터페이스를 implements 하고, catch 함수를 구현하면 된다
// 만약 HttpException을 빼면 전체에 대한 Exception Handler 로써 catch 된다
@Catch(HttpException)

// ExceptionFilter 인터페이스 implements
export class HttpExceptionFilter implements ExceptionFilter {
  // catch 함수를 구현
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // response 객체를 통해 statusCode, timestamp, 에러가 발생한 path를 출력
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
