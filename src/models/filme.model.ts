import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class FilmeModel{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 60})
    nome: String;

    @Column({ length: 60})
    genero: String;
    
    @Column('int')
    lancamento: Number;
    
    @Column({ length: 5 })
    duracao: String;
}