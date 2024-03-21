import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  async get_and_save(key: string, retrieveFn: () => Promise<any>) {
    let cachedValue = await this.get(key);
    if (cachedValue)
      return cachedValue;

    let value = await retrieveFn.call(this);
    if (value)
      this.set(key, value);

    return value;
  }

  clear(): Promise<void> {
    return this.storage.forEach((_value, key) => {
      if (key !== 'login') {
        this.storage.remove(key);
      }
    });
  }
}
