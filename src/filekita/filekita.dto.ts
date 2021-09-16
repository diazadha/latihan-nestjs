// Data Transfer Object
import { Type } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class FileKitaDTO {
    @IsString()
    // @Type(() => Number)
    nama: string;

    @IsString()
    deskripsi: string;

    @IsBoolean()
    isPublic: boolean;
}