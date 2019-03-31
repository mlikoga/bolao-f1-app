import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  db: firebase.firestore.Firestore;

  constructor(private cache : CacheService) {
    this.db = firebase.firestore();
  }

  async getUsers(): Promise<Array<User>> {
    let queryResult = await this.db.collection("users").get();
    return queryResult.docs.map(querySnap => querySnap.data() as User);
  }

}
