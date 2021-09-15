// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileKita {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    nama: string;

    @Column('text')
    deskripsi: string;

    @Column()
    isPublic: boolean;
}