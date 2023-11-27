import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class UsuarioModel{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ length: 25})
    userName: string;

    @Column({ length: 25})
    password: string;
    
    @Column({ default: false })
    online: boolean;

}