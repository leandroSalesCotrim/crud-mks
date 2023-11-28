import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioModel } from '../models/usuario.model';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { RedisService } from "nestjs-redis";
import { FilmeModel } from "src/models/filme.model";

@Injectable()
export class AuthService {
    private redisClient;

    constructor(
        private jwtService: JwtService,
        private redisService: RedisService
    ) {
        this.redisClient = this.redisService.getClient();
    }

    //---------------Validacao JWT---------------
    async verificarJWT(id, auth_token: string): Promise<boolean> {
        try {
            const decoded = await this.jwtService.verifyAsync(auth_token);
            if (!decoded) {
                throw new UnauthorizedException('Token não autorizado para requisição');
            }
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
    
    
    async RedisSetCacheFilmes(key: string, value: FilmeModel[]): Promise<void> {
        await this.redisService.getClient().setex(
            key,
            30, // segundos
            JSON.stringify(value),
          );
    }
    

    async RedisSetCacheUsuarios(key: string, value: UsuarioModel[]): Promise<void> {
        await this.redisService.getClient().setex(
            key,
            30, // segundos
            JSON.stringify(value),
          );
    }

    async RedisGetKey(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }
    async deletarChaveRedis(chave: string): Promise<number> {
        const res = await this.redisClient.del(chave);

        return res;
    }

}