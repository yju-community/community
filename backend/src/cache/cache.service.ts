import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}
  async get(key: string) {
    // cache server에서 key에 해당하는 value를 가져옵니다.
    return await this.cache.get(key);
  }
  async set(key: string, value: any) {
    // cache server에 key-value 형태로 데이터를 저장합니다.
    await this.cache.set(key, value);
  }
}
