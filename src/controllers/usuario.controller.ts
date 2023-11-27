import { Controller, Post, Get, Put, Delete, Body, ParseIntPipe, Param, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsuarioModel } from "../models/usuario.model";
import { UsuarioSchema } from "src/Schemas/usuario.schema";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Usuarios')
@Controller('/usuario')
export class UsuarioController {
    constructor(@InjectRepository(UsuarioModel) private model: Repository<UsuarioModel>) { }

    @Post()
    public async Create(
        @Body() body: UsuarioSchema,
    ): Promise<UsuarioModel> {
        const usuarioCriado = await this.model.save(body);
        return usuarioCriado;
    }

    @Get(':id')
    public async GetOne(@Param('id', ParseIntPipe) id: number): Promise<UsuarioModel> {
        const usuario = await this.model.findOne({ where: { id } });
        if (!usuario) {
            throw new NotFoundException(`Não foi possível encontrar um usuario com o id ${id}`);
        }
        return usuario;
    }

    @Get('')
    public async GetAll(): Promise<{ data: UsuarioModel[] }> {
        const list = await this.model.find();
        return { data: list };
    }

    @Put(':id')
    public async Update(@Param('id', ParseIntPipe) id: number, @Body() body: UsuarioSchema): Promise<UsuarioModel> {
        const usuario = await this.model.findOne({ where: { id } });
        if (!usuario) {
            throw new NotFoundException(`Não foi possível encontrar um usuario com o id ${id}`);
        }

        await this.model.update({ id }, body);
        return await this.model.findOne({ where: { id } });
    }

    @Delete(':id')
    public async Delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const usuario = await this.model.findOne({ where: { id } });
        if (!usuario) {
            throw new NotFoundException(`Não foi possível encontrar um usuario com o id ${id}`);
        }

        await this.model.delete(id);
        return `O usuario com o id ${id} foi deletada com sucesso!`;
    }
}