import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmeController} from "../controllers/filme.controller";
import { FilmeModel} from "../models/filme.model";
import { ConfigModule } from '@nestjs/config';
import { AuthService } from "src/services/auth.service";
import { UsuarioModule } from "./usuario.module";
import { JwtModule } from "@nestjs/jwt";
// import { AuthModule } from "./auth.module";
ConfigModule.forRoot();

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmeModel]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ],
  controllers: [FilmeController],
  providers: [AuthService]
}
)

export class FilmeModule {}
