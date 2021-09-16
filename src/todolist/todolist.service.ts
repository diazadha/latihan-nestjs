import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todolist } from './todolist.entity';
import { Repository } from 'typeorm';
import { todolistdto } from './todolist.dto';

@Injectable()
export class TodolistService {
    constructor(
        @InjectRepository(todolist)
        private todolistrepository: Repository<todolist>
    ) { }

    async getalldata() {
        return await this.todolistrepository.find();
    }

    async getdatabyid(id: number) {
        const temp = await this.todolistrepository.findOne({ where: { id } });
        if (temp) {
            return temp;
        } else {
            return { data: 'Data Not Found' }
        }
    }

    async createdata(data: todolistdto) {
        const new_row = await this.todolistrepository.create(data);
        await this.todolistrepository.save(new_row);
        return new_row;
    }

    async update(id: number, data: Partial<todolistdto>) {
        await this.todolistrepository.update({ id }, data)
        return await this.todolistrepository.findOne({ where: { id } })
    }

    async delete(id: number) {
        await this.todolistrepository.delete({ id });
        return { status: 'Data Deleted' };
    }

}
