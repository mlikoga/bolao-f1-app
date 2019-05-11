import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { TimeService } from './time.service';
import { UserService } from './user.service';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  db: firebase.firestore.Firestore;

  constructor(
    private cache : CacheService, 
    private timeService : TimeService,
    private userService : UserService) 
  {
    this.db = firebase.firestore();
  }

  async getCurrentBet(username: string): Promise<Bet> {
    let race = this.timeService.currentRace();
    return this.getUserBet(username, race.id);
  }

  async getUserBet(username: string, raceId: number): Promise<Bet> {
    let docId = `${username}.${raceId}`;
    return this.cache.get_and_save(docId, async (key) => {
      let doc = await this.db.collection('bets')
        .where("user", "==", username)
        .where("race", "<=", raceId)
        .orderBy("race", "desc")
        .limit(1)
        .get();
      let bet = doc.docs.pop().data() as Bet;
      console.log(bet);
      return bet;
    });
  }

  async getRaceBets(race: Race): Promise<Array<Bet>> {
    let users = await this.userService.getUsers();
    let bets = new Array<Bet>(users.length);
    for (let user of users) {
       bets.push(await this.getUserBet(user.username, race.id));
    }
    return bets;
  }
}
