import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmeModule } from './modules/filme.module';

@Module({
  imports: [FilmeModule, TypeOrmModule.forRoot({
    "database": "mksCinema",
    "type": "postgres",
    "username": "mksUser",
    "password": "mksPassword",
    "synchronize": true,
    "entities" : ["dist/**/*.model.js"]
  })],
})
export class AppModule {}
