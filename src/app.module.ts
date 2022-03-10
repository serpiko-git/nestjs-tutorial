import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { HostController } from './host/host.controller';
import { LoggerMiddleware } from './middleware/LoggerMiddleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, CatsController, HostController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // forRoutes 는 Route Path가 들어왔을때 미들웨어를 사용할 것인지 구분
    // exclude 를 통해 Route Ppath와 Method를 정의하여 예외 처리가 가능
    consumer.apply(LoggerMiddleware).exclude({ path: 'user/list', method: RequestMethod.GET }).forRoutes('user');
  }
}
