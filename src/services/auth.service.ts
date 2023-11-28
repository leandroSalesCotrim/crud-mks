import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioModel } from '../models/usuario.model';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { RedisService } from "nestjs-redis";

@Injectable()
export class AuthService {
    private redisClient;

    constructor(
        @InjectRepository(UsuarioModel) private model: Repository<UsuarioModel>,
        private jwtService: JwtService,
        private redisService: RedisService
    ) {
        this.redisClient = this.redisService.getClient();
    }

    //---------------Validacao JWT---------------
    async verificarJWT(id, auth_token: string): Promise<boolean> {
        try {
            const decoded = await this.jwtService.verifyAsync(auth_token);
            console.log(decoded);
            if (!decoded) {
                throw new UnauthorizedException('Token não autorizado para requisição');
            }
            console.log(await this.RedisGetKey(id) != auth_token);
            if (await this.RedisGetKey(id) != auth_token) {
                throw new UnauthorizedException('Token não autorizado para requisição');
            }

            return true;
        }catch(e){
            throw new UnauthorizedException('Token JWT inválido');
        }
    }

    //---------------funcoes redis---------------
    async RedisSetKey(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value);
    }
    async RedisGetKey(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }
    async deletarChaveRedis(chave: string): Promise<number> {
        const res = await this.redisClient.del(chave);

        return res;
    }

    //---------------funcoes de auth do user---------------
    public async login(usuario: UsuarioModel): Promise<any> {

        if (usuario.online) {
            throw new UnauthorizedException('Não foi possivel realizar o login, usuário já autenticado');
        }

        usuario.online = true;
        await this.model.update({ id: usuario.id }, usuario);

        const token = await this.jwtService.sign({ userId: usuario.id })
        await this.RedisSetKey(`${usuario.id}`, token);

        const res = { online: true, auth_token: token };
        return res;
    }

    public async logout(usuario: UsuarioModel, auth_token: string): Promise<string> {
        try {
            if (!usuario.online) {
                throw new UnauthorizedException('Não foi possível realizar o logout, usuário já se encontra offline');
            }

            if (await this.verificarJWT(usuario.id, auth_token)) {
                usuario.online = false;
                await this.model.update({ id: usuario.id }, usuario);
                await this.RedisSetKey(`${usuario.id}`, "");


                return "Logout realizado com sucesso!";

            }
        } catch (e) {
            throw new UnauthorizedException('Token JWT inválido');
        }

    }
}