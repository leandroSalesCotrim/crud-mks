import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Max, MaxLength, Min } from "class-validator";

export class FilmeSchema{
    @IsString()
    @MaxLength(60)
    @ApiProperty({
        description: 'Titulo do filme',
        example: 'Homem-Aranha 3'
    })
    nome: string;
    
    @IsString()
    @MaxLength(60)
    @ApiProperty({
        description: 'Categoria/genero do filme',
        example: 'Super-heroi'
    })
    genero: string;
    
    @IsInt()
    @Min(1970)
    @Max(2025)
    @ApiProperty({
        description: 'Ano de lançamento do filme',
        example: '2007'
    })
    lancamento: number;
    
    @IsString()
    @MaxLength(5)
    @ApiProperty({
        description: 'Tempo de duração do filme',
        example: '02:19'
    })
    duracao: string;
}