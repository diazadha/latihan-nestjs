import { Module } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { TodolistController } from './todolist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todolist } from './todolist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([todolist])
  ],
  controllers: [TodolistController],
  providers: [TodolistService]
})
export class TodolistModule { }
