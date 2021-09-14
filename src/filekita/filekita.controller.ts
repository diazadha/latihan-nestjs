import { Body, Controller, Delete, Get, Param, Post, Put, Render } from '@nestjs/common';
import { FilekitaService } from './filekita.service';
import { FileKitaDTO } from './filekita.dto';

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
