// Data Transfer Object
import { IsBoolean, IsString } from 'class-validator';

export class FileKitaDTO {
    @IsString()
    nama: string;

    @IsString()
    deskripsi: string;

    @IsBoolean()
    isPublic: boolean;
}