import { CacheModule, Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todolist } from './todolist.entity';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([todolist]),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    })
  ],
  controllers: [TodolistController],
  providers: [TodolistService]
})
export class TodolistModule { }
