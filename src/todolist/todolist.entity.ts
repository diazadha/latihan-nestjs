import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class todolist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    namakegiatan: string;

    @Column({ length: 128 })
    status: string;
}