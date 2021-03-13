import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { InitialBet } from 'app/model/initial-bet';
import { User } from 'app/model/user';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  db: firebase.firestore.Firestore;

  constructor(private cache : CacheService, private timeService: TimeService) {
    this.db = firebase.firestore();
  }

  async getUsers(season: number = this.timeService.currentSeason()): Promise<Array<User>> {
    const queryResult = await this.db.collection("initialBets")
      .where("season", "==", season)
      .get();

    // Users for the season are the ones who made an initial bet
    const initialBets = queryResult.docs.map(querySnap => querySnap.data() as InitialBet);
    return initialBets.map(initialBet => new User(initialBet.user, ''));
  }
}
