import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Module({
  imports: [
    RedisModule.register({
      host: process.env.REDIS_HOST, 
      port: 6379, 
    }),
  ],
  exports: [RedisModule],
})
export class RedisCacheModule {}