import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModule } from './modules/filme.module';

@Module({
  imports: [FilmeModule, TypeOrmModule.forRoot({
    "host": "nest-postgres",
    "type": "postgres",
    "database": "mksCinema",
    "username": "mksUser",
    "password": "mksPassword",
    "synchronize": true,
    "entities" : ["dist/**/*.model.js"]
  })],
})
export class AppModule {}
