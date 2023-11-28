import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.register({
      host: 'localhost', // coloque o host do seu servidor Redis
      port: 6379, // porta padrão do Redis
    }),
  ],
  exports: [RedisModule],
})
export class RedisCacheModule {}