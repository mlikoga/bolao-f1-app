import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: Storage) { }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  async get_and_save(key: string, retrieveFn: (key: string) => Promise<any>) {
    let cachedValue = await this.get(key);
    if (cachedValue)
      return cachedValue;

    let value = await retrieveFn.call(key);
    if (value)
      this.set(key, value);

    return value;
  }
}
