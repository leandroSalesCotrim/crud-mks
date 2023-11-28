import { Controller, Post, Get, Put, Delete, Body, ParseIntPipe, Param, NotFoundException, Headers } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioModel } from "../models/usuario.model";
import { UsuarioSchema } from "src/Schemas/usuario.schema";
import { ApiHeader, ApiParam, ApiTags } from "@nestjs/swagger";
import { AuthService } from "src/services/auth.service";
import { UsuarioLogoutSchema } from "src/Schemas/usuario.logout.schema";



@ApiTags('Usuarios')
@Controller('/usuario')
export class UsuarioController {

    constructor(
        @InjectRepository(UsuarioModel) private model: Repository<UsuarioModel>,
        private authService: AuthService
    ) { }

    //OBS: não deixei como padrão a verificação de login no post para que seja possivel 
    //criar o primeiro usuário pelo swagger
    @Post()
    public async Create(
        @Body() body: UsuarioSchema,
    ): Promise<UsuarioModel> {

            const usuarioCriado = await this.model.save(body);
            return usuarioCriado;
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'Id do usuário que será buscado', example: 1, required: true })
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar a busca', example: 1, required: true })
    public async GetOne(
        @Param('id', ParseIntPipe) id: number,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<UsuarioModel> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const usuario = await this.model.findOne({ where: { id } });

            if (!usuario) {
                throw new NotFoundException(`Não foi possível encontrar um usuario com o id ${id}`);
            }

            return usuario;
        }
    }

    @Get('')
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar a busca', example: 1, required: true })
    public async GetAll(
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string,
    ): Promise<{ data: UsuarioModel[] }> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const list = await this.model.find();
            return { data: list };
        }
    }

    @Put(':id')
    @ApiParam({ name: 'id', description: 'Id do usuário que será atualizado', example: 1, required: true })
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar o update', example: 1, required: true })
    public async Update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UsuarioSchema,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<UsuarioModel> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const usuario = await this.model.findOne({ where: { id } });

            if (!usuario) {
                throw new NotFoundException(`Não foi possível encontrar um usuario com o id ${id}`);
            }

            await this.model.update({ id }, body);
            return await this.model.findOne({ where: { id } });
        }
    }

    @Delete(':id')
    @ApiParam({ name: 'id', description: 'Id do usuário que será deletado', example: 1, required: true })
    @ApiHeader({ name: 'user_id', description: 'Id do usuário que irá realizar o delete', example: 1, required: true })
    public async Delete(
        @Param('id', ParseIntPipe) id: number,
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string
    ): Promise<string> {
        if (await this.authService.verificarJWT(user_id, auth_token)) {
            const usuario = await this.model.findOne({ where: { id } });
            if (!usuario) {
                throw new NotFoundException(`Não foi possível encontrar um usuario com o id ${id}`);
            }

            await this.model.delete(id);
            await this.authService.deletarChaveRedis(`${id}`);
            return `O usuario com o id ${id} foi deletada com sucesso!`;
        }
    }

    @Post('/login')
    public async Login(@Body() body: UsuarioSchema): Promise<any> {
        const { userName, password } = body;
        const usuario = await this.model.findOne({ where: { userName, password } });

        if (!usuario) {
            throw new NotFoundException(
                'Não foi possível realizar o login com o usuário fornecido, usuário não encontrado',
            );
        }
        return this.authService.login(usuario);
    }

    @Post('/logout')
    public async Logout(
        @Headers('user_id') user_id: number,
        @Headers('x-acess-token') auth_token: string): Promise<String> {
        const usuario = await this.model.findOne({ where: { id:user_id } });

        if (!usuario) {
            throw new NotFoundException(
                'Não foi possível realizar o logout com o usuário fornecido, usuário não encontrado',
            );
        }
        return await this.authService.logout(usuario, auth_token);
    }
}