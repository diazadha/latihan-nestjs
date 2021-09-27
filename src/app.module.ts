import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilekitaModule } from './filekita/filekita.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { Repository } from 'typeorm';
import { TodolistModule } from './todolist/todolist.module';
import * as redisStore from 'cache-manager-redis-store';



@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    FilekitaModule,
    Repository,
    TodolistModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    }
  ],
})
export class AppModule { }
