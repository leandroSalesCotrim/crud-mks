import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, MaxLength, MinLength } from "class-validator";

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
    
    @IsBoolean()
    @ApiProperty({
        description: 'Booleano que indica se o usuário está logado ou não',
        example: true
    })
    online: boolean;
    
}