// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { FilmeModel } from 'src/models/filme.model';
// import { UsuarioModel } from 'src/models/usuario.model';
// import { AuthService } from "src/services/auth.service";
// import { RedisCacheModule } from './redis.module';

// @Module({
//     imports: [
//         RedisCacheModule,
//         JwtModule.register({ secret: process.env.JWT_SECRET })
//     ],
//     providers: [AuthService],
//     exports: [AuthService],
// })
// export class AuthModule { }