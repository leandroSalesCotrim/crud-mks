import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioModel } from '../models/usuario.model';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { RedisService } from "nestjs-redis";
import { AuthService } from "./auth.service";

@Injectable()
export class UsuarioService {
    private redisClient;

    constructor(
        @InjectRepository(UsuarioModel) 
        private model: Repository<UsuarioModel>,
        private jwtService: JwtService,
        private redisService: RedisService,
        private AuthService: AuthService
    ) {
        this.redisClient = this.redisService.getClient();
    }

    //---------------funcoes de auth do user---------------
    public async login(usuario: UsuarioModel): Promise<any> {

         if (usuario.online) {
             throw new UnauthorizedException('Não foi possivel realizar o login, usuário já autenticado');
        }

        usuario.online = true;
        await this.model.update({ id: usuario.id }, usuario);

        const token = await this.jwtService.sign({ userId: usuario.id })
        await this.AuthService.RedisSetKey(`${usuario.id}`, token);

        const res = { online: true, auth_token: token };
        return res;
    }

    public async logout(usuario: UsuarioModel, auth_token: string): Promise<string> {
        try {
            if (!usuario.online) {
                throw new UnauthorizedException('Não foi possível realizar o logout, usuário já se encontra offline');
            }

            if (await this.AuthService.verificarJWT(usuario.id, auth_token)) {
                usuario.online = false;
                await this.model.update({ id: usuario.id }, usuario);
                await this.AuthService.RedisSetKey(`${usuario.id}`, "");


                return "Logout realizado com sucesso!";

            }
        } catch (e) {
            throw new UnauthorizedException('Token JWT inválido');
        }

    }
}