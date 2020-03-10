import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { UserService } from './user.service';
import { InitialBet } from '../model/initial-bet';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class InitialBetService {

  db: firebase.firestore.Firestore;

  constructor(
    private cache : CacheService,
    private userService : UserService)
  {
    this.db = firebase.firestore();
  }

  async getUserInitialBet(username: string, season: number): Promise<InitialBet> {
    let docId = `${season}.${username}`;
    return this.cache.get_and_save(docId, async () => {
      let doc = await this.db.collection('initialBets')
        .where("user", "==", username)
        .where("season", "==", season)
        .get();
      let result = doc.docs.pop();
      if (result) {
        let initialBet = result.data() as InitialBet;
        console.log('InitialBet: ', initialBet);
        return initialBet;
      }
      return null;
    });
  }

  async setUserInitialBet(initialBet: InitialBet) {
    let docId = `${initialBet.season}.${initialBet.user}`;
    this.db.collection('initialBets').doc(docId).set(Object.assign(initialBet, {
      createdAt: new Date(),
    }), { merge: true });
  }

}
