import { CacheModule, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost', // redis가 작동하는 instance의 정보를 입력합니다.
        port: 6379, // redis는 6379 포트를 기본으로 사용합니다.
        ttl: 100000, // 캐시 만료 시간입니다.(초)
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class RedisCacheModule {}
