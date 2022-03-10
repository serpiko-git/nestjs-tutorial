import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { TestService } from 'src/test/test.service';

@Controller('user')
export class UserController {
  // 의존성(Dependency) 주입
  constructor(private userService: UserService, private testService: TestService) {
    this.userService = userService;
    this.testService = testService;
  }

  // @Get(':userId')
  // findOne(@Param('userId') id: string): string {
  //   return Object.assign({ id, userName: 'serpiko' });
  // }
  // @Get('list')
  // findAll(): Promise<any[]> {
  //   return new Promise((resolve) => setTimeout(() => resolve([{ userName: '허정진' }, { userName: '나그네' }]), 100));
  // }
  // @Post()
  // saveUser(@Body() userDto: UserDto): string {
  //   return Object.assign({
  //     statusCode: 201,
  //     data: { ...userDto },
  //     statusMsg: 'saved successfully',
  //   });
  // }
  @Get('list')
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
  @Get('test')
  findAnotherTest(): string {
    return this.testService.getInfo();
  }
  @Get(':userId')
  findOne(@Param('userId') id: string): any | object {
    return this.userService.findOne(id);
  }
  @Post()
  saveUser(@Body() userDto: UserDto): string {
    this.userService.saveUser(userDto);
    return Object.assign({
      data: { ...userDto },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }
}
