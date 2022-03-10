import { Body, Controller, Get, HttpCode, Delete, Put, Param, Post, Query, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { ListAllEntities } from './list-all-entities';
import { UpdateCatDto } from './update-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }

  @Get()
  findAll(@Query() id: string) {
    // return `This action returns all cats (limit: ${query.limit} items)`;
    console.log(id);
    return `${id}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  // @Post()
  // @HttpCode(201)
  // async create(@Body() createCatDto: CreateCatDto): Promise<CreateCatDto> {
  //   console.log(createCatDto);
  //   // return 'This action adds a new cat';
  //   return createCatDto;
  // }
}
