import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

@Module({
  imports: [
    RedisModule.register({
      url: process.env.REDIS_URL, 
    }),
  ],
  exports: [RedisModule],
})
export class RedisCacheModule {}