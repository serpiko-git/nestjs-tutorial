import { Injectable, NestMiddleware } from '@nestjs/common';

// Injectable 데코레이터 디펜던시로 사용하고, AppModule 에서 NestModule 을 implement 하여 configure를 통해 MiddlewareConsumer 객체를 통해 apply 시켜야 한다.
@Injectable()
// NestMiddleware 를 implements 하여 정의된 use 함수를 구현
export class LoggerMiddleware implements NestMiddleware {
  // 사실 use 함수의 파라메터의 req는 HttpRequest 타입으로 정의 할 수 있다.
  use(req: any, res: any, next: () => void): any {
    console.log('Client Request 요청됨.');
    console.log(req);

    // next() 하지 않는 다면 다음 기능으로 넘어가지 않으므로 유의
    next();
  }
}
