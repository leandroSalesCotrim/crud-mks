import { IsInt, IsString, Max, MaxLength, Min } from "class-validator";

export class FilmeSchema{
    @IsString()
    @MaxLength(60)
    nome: String;
    
    @IsString()
    @MaxLength(60)
    genero: String;
    
    @IsInt()
    @Min(1970)
    @Max(2025)
    lancamento: Number;
    
    @IsString()
    @MaxLength(5)
    duracao: String;
}