import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileKita } from './filekita.entity';
import { Repository } from 'typeorm';
import { FileKitaDTO } from './filekita.dto';

@Injectable()
export class FilekitaService {
    constructor(
        @InjectRepository(FileKita)
        private filekitaRepository: Repository<FileKita>
    ) { }

    async showAll() {
        return await this.filekitaRepository.find();
    }

    async create(data: FileKitaDTO) {
        const new_row = await this.filekitaRepository.create(data);
        await this.filekitaRepository.save(new_row);
        return new_row;
    }

    async hasil() {
        return 'Service file kita';
    }

    async showbyid(id: string) {
        return await this.filekitaRepository.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<FileKitaDTO>) {
        await this.filekitaRepository.update({ id }, data);
        return await this.filekitaRepository.findOne({ where: { id } });
    }

    async delete(id: number) {
        await this.filekitaRepository.delete({ id });
        return { deleted: true }
    };

}
