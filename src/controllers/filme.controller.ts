import { Controller, Post, Get, Put, Delete, Inject, Body, ValidationPipe, ParseIntPipe, Param, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FilmeModel } from "../models/filme.model";
import { FilmeSchema } from "src/Schemas/filme.schema";

@Controller('/filme')
export class FilmeController {
    constructor(@InjectRepository(FilmeModel) private model: Repository<FilmeModel>) { }

    @Post()
    public async Create(
        @Body() body: FilmeSchema,
    ): Promise<FilmeModel> {
        const filmeCriado = await this.model.save(body);
        return filmeCriado;
    }

    @Get(':id')
    public async GetOne(@Param('id', ParseIntPipe) id: number): Promise<FilmeModel> {
        const filme = await this.model.findOne({ where: { id } });
        if (!filme) {
            throw new NotFoundException(`Não foi possível encontrar um filme com o id ${id}`);
        }
        return filme;
    }

    @Get('')
    public async GetAll(): Promise<{ data: FilmeModel[] }> {
        const list = await this.model.find();
        return { data: list };
    }

    @Put(':id')
    public async Update(@Param('id', ParseIntPipe) id: number, @Body() body: FilmeSchema): Promise<FilmeModel> {
        const filme = await this.model.findOne({ where: { id } });
        if (!filme) {
            throw new NotFoundException(`Não foi possível encontrar um filme com o id ${id}`);
        }

        await this.model.update({ id }, body);
        return await this.model.findOne({ where: { id } });
    }

    @Delete(':id')
    public async Delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const filme = await this.model.findOne({ where: { id } });
        if (!filme) {
            throw new NotFoundException(`Não foi possível encontrar um filme com o id ${id}`);
        }

        await this.model.delete(id);
        return `O filme com o id ${id} foi deletada com sucesso!`;
    }
}