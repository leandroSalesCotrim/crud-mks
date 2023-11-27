import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController} from "../controllers/usuario.controller";
import { UsuarioModel} from "../models/usuario.model";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioModel])],
  controllers: [UsuarioController],
})

export class UsuarioModule {}
