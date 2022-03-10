import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TestModule } from 'src/test/test.module';
@Module({
  imports: [TestModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
