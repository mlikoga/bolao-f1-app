import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { UserService } from './user.service';
import { Bet } from '../model/bet';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  db: firebase.firestore.Firestore;

  constructor(
    private cache : CacheService,
    private userService : UserService)
  {
    this.db = firebase.firestore();
  }

  async getUserBet(username: string, raceId: number): Promise<Bet> {
    let docId = `${username}.${raceId}`;
    return this.cache.get_and_save(docId, async () => {
      let doc = await this.db.collection('bets')
        .where("user", "==", username)
        .where("race", "<=", raceId)
        .orderBy("race", "desc")
        .limit(1)
        .get();
      let result = doc.docs.pop();
      if (result) {
        let bet = result.data() as Bet;
        console.log(bet);
        return bet;
      }
      return null;
    });
  }

  async getRaceBets(raceId: number): Promise<Array<Bet>> {
    let bets = await this.db.collection('bets').where('race', '==', raceId).get();
    return bets.docs.map(querySnap => querySnap.data() as Bet);
  }

  async getUsersWithoutBet(raceId: number): Promise<Array<string>> {
    const allUsers = (await this.userService.getUsers()).map(user => user.username);
    const usersWithBet = (await this.getRaceBets(raceId)).map(bet => bet.user);
    const usersWithoutBet = allUsers.filter(user => !usersWithBet.includes(user));
    return usersWithoutBet;
  }

  createBets(usersWithoutBet: Array<string>, raceId: number) {
    usersWithoutBet.forEach(async username => {
      const docId = `${username}.${raceId}`;
      const betRef = this.db.collection('bets').doc(docId);
      const lastBet = await this.getUserBet(username, raceId - 1);
      betRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          const copiedBet = {
            ...lastBet,
            createdAt: new Date,
            race: raceId,
            forgotten: true,
          }
          console.log(`Creating bet for ${copiedBet.user}`);
          console.log(copiedBet);
          betRef.set(copiedBet);
        }
      });
    });
  }

  async backupBets() {
    let betsQuery = await this.db.collection('bets').get();
    let bets = betsQuery.docs.map(querySnap => querySnap.data() as Bet);

    console.log(JSON.stringify(bets));
  }
}
