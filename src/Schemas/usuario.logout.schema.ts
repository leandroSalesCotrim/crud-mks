import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString, MaxLength, MinLength } from "class-validator";

export class UsuarioLogoutSchema{
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

    @IsString()
    @IsJWT()
    @ApiProperty({
        description: 'Token de autenticação do usuario',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcwMTA5OTU4N30.W9rYZq2lgBU-lpeXS5KKRKb8cZXKbFfx4khrgSJZKnQ'
    })
    auth_token: string;
    
}