import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { InitialBet } from '../model/initial-bet';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class InitialBetService {

  db: firebase.firestore.Firestore;
  currentSeason: number;

  constructor(private cache : CacheService, private timeService: TimeService)
  {
    this.db = firebase.firestore();
    this.currentSeason = this.timeService.currentSeason() || 2021;
  }

  async getUserInitialBet(username: string, season: number = this.currentSeason): Promise<InitialBet> {
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

  async userHasInitialBet(username: string, season: number = this.currentSeason): Promise<boolean> {
    return await this.getUserInitialBet(username, season) != null;
  }

  async setUserInitialBet(initialBet: InitialBet) {
    let docId = `${initialBet.season}.${initialBet.user}`;
    this.db.collection('initialBets').doc(docId).set(Object.assign(initialBet, {
      createdAt: new Date(),
    }), { merge: true });
  }

  async getInitialBets(season: number = this.currentSeason): Promise<Array<InitialBet>> {
    let initialBets = await this.db.collection('initialBets').where('season', '==', season).get();
    return initialBets.docs.map(querySnap => querySnap.data() as InitialBet);
  }

}
