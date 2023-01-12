import { Injectable } from '@nestjs/common';
import { memoryStore } from 'cache-manager';
import { CacheKeys } from './store.model';

@Injectable()
export class StoreService {
  private cacheManager = memoryStore();

  async get<T>(key: CacheKeys) {
    return await this.cacheManager.get<T>(key);
  }

  async set<T>(key: CacheKeys, value: any) {
    return await this.cacheManager.set<T>(key, value);
  }
}
