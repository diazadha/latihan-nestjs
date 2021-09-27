import { Body, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, UsePipes } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { todolistdto } from './todolist.dto';
import { redis } from '../redis';
import { Cache } from 'cache-manager';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get()
  async getalldata() {
    // const temp = { data: await this.todolistService.getalldata() };
    // await this.cacheManager.set('getall', temp, { ttl: 0 });
    try {
      const temp = await this.cacheManager.get('getall');
      if (!temp) {
        const result = { data: await this.todolistService.getalldata() };
        await this.cacheManager.set('getall', result, { ttl: 0 });
        return result;
      }
      return temp;
    } catch (error) {
      return console.log(error);
    }
  }

  @Get(':id')
  async getdatabyid(@Param('id') id: string) {
    try {
      const key = 'todo:' + id;
      const temp = await this.cacheManager.get(key);
      if (!temp) {
        const result = await this.todolistService.getdatabyid(+id);
        await this.cacheManager.set(key, result, { ttl: 0 });
        return result;
      }
      return temp;
    } catch (error) {
      return console.log(error);
    }

  }

  @Post()
  @UsePipes(new ValidationPipe())
  createrecord(@Body() data: todolistdto) {
    this.cacheManager.del('getall');
    return this.todolistService.createdata(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<todolistdto>) {
    const temp_getall = this.cacheManager.get('getall');
    const temp_getid = this.cacheManager.get('todo:' + id);
    if (temp_getall) {
      this.cacheManager.del('getall');
    }
    if (temp_getid) {
      this.cacheManager.del('todo:' + id);
    }
    return this.todolistService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const temp_getall = this.cacheManager.get('getall');
    const temp_getid = this.cacheManager.get('todo:' + id);
    if (temp_getall) {
      this.cacheManager.del('getall');
    }
    if (temp_getid) {
      this.cacheManager.del('todo:' + id);
    }
    return this.todolistService.delete(+id);
  }

}
