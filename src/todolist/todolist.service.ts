import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todolist } from './todolist.entity';
import { Connection, Repository } from 'typeorm';
import { todolistdto } from './todolist.dto';
import { sendemail } from '../utils/sendemail';
import { redis } from '../redis';

@Injectable()
export class TodolistService {
    constructor(
        @InjectRepository(todolist)
        private todolistrepository: Repository<todolist>, private connection: Connection
    ) { }

    async getalldata() {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await this.connection.createQueryBuilder()
                .select("todolist")
                .from(todolist, "todolist")
                .getMany()
            await queryRunner.manager.save(result);
            await queryRunner.commitTransaction();
            return result;
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();

        }
    }

    async getdatabyid(id: number) {
        // const temp = await this.todolistrepository.findOne({ where: { id } });
        // if (temp) {
        //     return temp;
        // } else {
        //     return { data: 'Data Not Found' }
        // }

        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // await queryRunner.manager.save(users[0]);
            // await queryRunner.manager.save(users[1]);
            const result = await this.connection.createQueryBuilder()
                .select("todolist")
                .from(todolist, "todolist")
                .where("todolist.id = :id", { id: id })
                .getOne()
            await queryRunner.manager.save(result);
            await queryRunner.commitTransaction();
            return result;
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
            console.log('ada error ' + err)
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();

        }
    }

    async createdata(data: todolistdto) {
        // const new_row = await this.todolistrepository.create(data);
        // await this.todolistrepository.save(new_row);

        // return new_row;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.connection.createQueryBuilder()
                .insert()
                .into(todolist)
                .values([data])
                .execute()
            // sendemail();
            // await queryRunner.manager.save(result);
            // await queryRunner.manager.save(sendemail);
            await queryRunner.commitTransaction();
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();

        }
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
