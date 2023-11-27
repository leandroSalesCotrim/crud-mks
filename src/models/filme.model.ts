import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FilmeModel{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 60})
    nome: string;

    @Column({ length: 60})
    genero: string;
    
    @Column('int')
    lancamento: number;
    
    @Column({ length: 5 })
    duracao: string;
}