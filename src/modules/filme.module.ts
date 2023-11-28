import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmeController} from "../controllers/filme.controller";
import { FilmeModel} from "../models/filme.model";
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Module({
  imports: [TypeOrmModule.forFeature([FilmeModel])],
  controllers: [FilmeController],
})

export class FilmeModule {}
