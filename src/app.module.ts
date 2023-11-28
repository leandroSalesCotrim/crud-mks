import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModule } from './modules/filme.module';
import { UsuarioModule } from './modules/usuario.module';
import { RedisCacheModule } from './modules/redis.module';
// import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    FilmeModule, 
    UsuarioModule, 
    // AuthModule, 
    RedisCacheModule, 
    TypeOrmModule.forRoot({
    //"host": "localhost",
    "host": process.env.POSTGRES_HOST,
    "type": "postgres",
    "database": process.env.POSTGRES_DB,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "synchronize": true,
    "entities" : ["dist/**/*.model.js"]
  })
  ],
})
export class AppModule {}
