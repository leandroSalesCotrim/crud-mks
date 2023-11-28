import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController} from "../controllers/usuario.controller";
import { UsuarioModel} from "../models/usuario.model";
// import { AuthModule } from "src/modules/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { RedisCacheModule } from "./redis.module";
import { ConfigModule } from '@nestjs/config';
import { AuthService } from "src/services/auth.service";
import { FilmeModule } from "./filme.module";
import { UsuarioService } from "src/services/usuario.service";
ConfigModule.forRoot();

@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([UsuarioModel]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ],
  controllers: [UsuarioController],
  providers: [
    AuthService,
    UsuarioService
  ]
})

export class UsuarioModule {}
