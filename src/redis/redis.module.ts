import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as NRedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NRedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
        return {
          config: {
            url: configService.get<string>('REDIS_URL'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
