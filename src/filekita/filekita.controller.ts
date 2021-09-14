import { Body, Controller, Delete, Get, Param, Post, Put, Render, UsePipes } from '@nestjs/common';
import { FilekitaService } from './filekita.service';
import { FileKitaDTO } from './filekita.dto';
// import { ValidationPipe } from 'src/shared/validation.pipe';
import { ValidationPipe } from '../shared/validation.pipe';

@Controller('filekita')
export class FilekitaController {
    constructor(private FilekitaService: FilekitaService) { }

    @Get('jsondata')
    async hasil() {
        // return 'Ini halaman filekita';
        return { data: await this.FilekitaService.showAll() };
        // kalo fungsi async harus pake await
    }

    @Get()
    @Render('filekita/index') //akan memanggil file di folder views
    root() {
        return { message: 'Hello World!', title: 'Index FileKita' };
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createrecord(@Body() data: FileKitaDTO) {
        return this.FilekitaService.create(data);
    }

    // @Get('service')
    // showall() {
    //     return this.FilekitaService.hasil();
    // }

    @Get(':id')
    hasil_detail(@Param('id') id: string) {
        // return 'Ini halaman detail' + id;
        return this.FilekitaService.showbyid(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() data: Partial<FileKitaDTO>) {
        // return 'Ini halaman detail' + id;
        return this.FilekitaService.update(+id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        // return 'Ini halaman detail' + id;
        return this.FilekitaService.delete(+id);
    }

}
