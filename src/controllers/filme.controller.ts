import { Controller, Post, Get, Put, Delete, Body, ParseIntPipe, Param, NotFoundException, Headers } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilmeModel } from "../models/filme.model";
import { FilmeSchema } from "src/Schemas/filme.schema";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/services/auth.service";

@ApiTags('Filmes')
@Controller('/filme')
export class FilmeController {

    constructor(
        @InjectRepository(FilmeModel)
        private model: Repository<FilmeModel>,
        private authService: AuthService,
    ) { }

    @Post()
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar a insercao', example: 1, required: true })
    public async Create(
        @Body() body: FilmeSchema,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<FilmeModel> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const filme = await this.model.findOne({ where: { nome: body.nome, lancamento: body.lancamento, duracao: body.duracao  } });
            if (filme) {
                throw new NotFoundException(`Não foi possível registrar o filme informado, pois já o mesmo já existe.`);
            }

            const filmeCriado = await this.model.save(body);
            return filmeCriado;
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Id do filme que será buscado', example: 1, required: true })
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar a busca', example: 1, required: true })
    public async GetOne(
        @Param('id', ParseIntPipe) id: number,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<{data : FilmeModel}> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {

            const filme = await this.model.findOne({ where: { id } });

            if (!filme) {
                throw new NotFoundException(`Não foi possível encontrar um filme com o id ${id}`);
            }

            return {data : filme};
        }
    }

    @Get('')
    @ApiHeader({ name: 'user_id', description: 'Id do usuario que irá realizar a busca', example: 1, required: true })
    public async GetAll(
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<{ data: FilmeModel[] }> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const cacheKey = `filmes:${user_id}`;

            const cachedData = await this.authService.RedisGetKey(cacheKey);
            if (cachedData) {
                return { data: JSON.parse(cachedData) };
            }

            const list = await this.model.find();
            await this.authService.RedisSetCacheFilmes(cacheKey, list);
            return { data: list };
        }
    }

    @Put(':id')
    @ApiParam({ name: 'id', description: 'Id do filme que será atualizado', example: 1, required: true })
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar a busca', example: 1, required: true })
    public async Update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: FilmeSchema,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<FilmeModel> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const filme = await this.model.findOne({ where: { id } });
            if (!filme) {
                throw new NotFoundException(`Não foi possível encontrar um filme com o id ${id}`);
            }
            await this.model.update({ id }, body);
            return await this.model.findOne({ where: { id } });
        }
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'Id do filme que será deletado', example: 1, required: true })
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar a busca', example: 1, required: true })
    public async Delete(
        @Param('id', ParseIntPipe) id: number,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<string> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const filme = await this.model.findOne({ where: { id } });
            if (!filme) {
                throw new NotFoundException(`Não foi possível encontrar um filme com o id ${id}`);
            }

            await this.model.delete(id);
            return `O filme com o id ${id} foi deletado com sucesso!`;
        }
    }
}