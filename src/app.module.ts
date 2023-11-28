import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModule } from './modules/filme.module';
import { UsuarioModule } from './modules/usuario.module';
import { RedisCacheModule } from './modules/redis.module';

@Module({
  imports: [
    FilmeModule, 
    UsuarioModule, 
    RedisCacheModule, 
    TypeOrmModule.forRoot({
    "host": "localhost",
    // "host": "nest-postgres",
    "type": "postgres",
    "database": "mksCinema",
    "username": "mksUser",
    "password": "mksPassword",
    "synchronize": true,
    "entities" : ["dist/**/*.model.js"]
  })
  ],
})
export class AppModule {}
