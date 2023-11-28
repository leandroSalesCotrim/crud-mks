import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController} from "../controllers/usuario.controller";
import { UsuarioModel} from "../models/usuario.model";
import { AuthService } from "src/services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { RedisCacheModule } from "./redis.module";
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Module({
  imports: [
    RedisCacheModule,
    TypeOrmModule.forFeature([UsuarioModel]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ],
  controllers: [UsuarioController],
  providers: [AuthService]
})

export class UsuarioModule {}
