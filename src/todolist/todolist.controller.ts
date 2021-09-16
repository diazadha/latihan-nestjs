import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { todolistdto } from './todolist.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) { }

  @Get()
  async getalldata() {
    return { data: await this.todolistService.getalldata() };
  }

  @Get(':id')
  getdatabyid(@Param('id') id: string) {
    return this.todolistService.getdatabyid(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createrecord(@Body() data: todolistdto) {
    return this.todolistService.createdata(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<todolistdto>) {
    return this.todolistService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todolistService.delete(+id);
  }

}
