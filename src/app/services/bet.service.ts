import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { TimeService } from './time.service';
import { Bet } from '../model/bet';
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
    let docId = `${username}.${race.id}`;
    return this.cache.get_and_save(docId, async (key) => {
      let doc = await this.db.collection('bets').doc(docId).get();
      return doc.data() as Bet;
    });
  }
}
