import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { TimeService } from './time.service';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  db: firebase.firestore.Firestore;

  constructor(private cache : CacheService, private timeService : TimeService) {
    this.db = firebase.firestore();
  }

  async getCurrentBet(username: string): Promise<Bet> {
    let race = this.timeService.currentRace();
    return this.getUserBet(username, race.id);
  }

  async getUserBet(username: string, raceId: number) {
    let docId = `${username}.${raceId}`;
    return this.cache.get_and_save(docId, async (key) => {
      let doc = await this.db.collection('bets').doc(docId).get();
      return doc.data() as Bet;
    });
  }

  async getRaceBets(race: Race): Promise<Array<Bet>> {
    let bets = await this.db.collection('bets').where('race', '==', race.id).get();
    return bets.docs.map(querySnap => querySnap.data() as Bet);
  }
}
