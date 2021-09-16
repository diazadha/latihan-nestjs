import { IsString } from "class-validator";

export class todolistdto {
    @IsString()
    namakegiatan: string;

    @IsString()
    status: string;
}