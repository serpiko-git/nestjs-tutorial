import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getInfo(): string {
    return `This is TestService instance.`;
  }
}
