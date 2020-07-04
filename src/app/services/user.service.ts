import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { InitialBet } from 'app/model/initial-bet';
import { User } from 'app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  db: firebase.firestore.Firestore;

  constructor(private cache : CacheService) {
    this.db = firebase.firestore();
  }

  async getUsers(season: number = 2020): Promise<Array<User>> {
    const queryResult = await this.db.collection("initialBets")
      .where("season", "==", season)
      .get();
    const initialBets = queryResult.docs.map(querySnap => querySnap.data() as InitialBet);
    console.log(initialBets)
    return initialBets.map(initialBet => new User(initialBet.user, ''));
  }
}
