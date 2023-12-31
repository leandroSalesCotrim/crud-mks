import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString, MaxLength, MinLength } from "class-validator";

export class UsuarioSchema{
    @IsString()
    @MaxLength(25)
    @ApiProperty({
        description: 'Login do usuario',
        example: 'leandrocotrim'
    })
    userName: string;
    
    @IsString()
    @MaxLength(25)
    @MinLength(4)
    @ApiProperty({
        description: 'Senha de login do usuario',
        example: 'senha123'
    })
    password: string;

}