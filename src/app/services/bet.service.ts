import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { UserService } from './user.service';
import { Bet } from '../model/bet';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  db: firebase.firestore.Firestore;
  converter: firebase.firestore.FirestoreDataConverter<Bet>;

  constructor(
    private cache : CacheService,
    private userService : UserService)
  {
    this.db = firebase.firestore();
    this.converter = {
      toFirestore: function(bet) {
          return {...bet};
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return Bet.from(data as Bet);
      }
    };
  }

  async getUserBet(username: string, raceId: string): Promise<Bet> {
    let docId = `${username}.${raceId}`;
    return this.cache.get_and_save(docId, async () => {
      let doc = await this.db.collection('bets')
        .where("user", "==", username)
        .where("race", "==", raceId)
        .limit(1)
        .withConverter(this.converter)
        .get();
      let result = doc.docs.pop();
      if (result) {
        let bet = result.data();
        return bet;
      }
      return null;
    });
  }

  async getLastUserBet(username: string, season: number): Promise<Bet> {
    let doc = await this.db.collection('bets')
      .where("user", "==", username)
      .where("forgotten", "==", false)
      .where("race", ">", season.toString()) // here we assume race starts with season number
      .orderBy("race", "desc")
      .limit(1)
      .withConverter(this.converter)
      .get();
    let result = doc.docs.pop();
    if (result) {
      let bet = result.data();
      return bet;
    }
    return null;
  }

  async getRaceBets(raceId: string): Promise<Array<Bet>> {
    let betsQuery = await this.db.collection('bets')
      .where('race', '==', raceId)
      .withConverter(this.converter)
      .get();
    let bets = betsQuery.docs.map(querySnap => querySnap.data());
    return bets.filter(bet => !bet.forgotten);
  }

  async getUsersWithoutBet(raceId: string): Promise<Array<string>> {
    const allUsers = (await this.userService.getUsers()).map(user => user.username);
    const usersWithBet = (await this.getRaceBets(raceId)).map(bet => bet.user);
    const usersWithoutBet = allUsers.filter(user => !usersWithBet.includes(user));
    return usersWithoutBet;
  }

  createBets(usersWithoutBet: Array<string>, season: number, raceNumber: number) {
    usersWithoutBet.forEach(async username => {
      const docId = `${username}.${season}.${raceNumber}`;
      const betRef = this.db.collection('bets').doc(docId);
      const lastBet = await this.getUserBet(username, `${season}.${raceNumber - 1}`);
      betRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          const copiedBet = {
            ...lastBet,
            createdAt: new Date,
            race: `${season}.${raceNumber}`,
            forgotten: true,
          }
          console.log(`Creating bet for ${copiedBet.user}`);
          console.log(copiedBet);
          betRef.set(copiedBet);
        }
      });
    });
  }

  createForgottenBets(usersWithoutBet: Array<string>, raceId: string) {
    usersWithoutBet.forEach(async username => {
      const docId = `${username}.${raceId}`;
      const betRef = this.db.collection('bets').doc(docId);
      betRef.get().then(docSnapshot => {
        if (!docSnapshot.exists) {
          const forgottenBet = {
            createdAt: new Date(),
            race: raceId,
            forgotten: true,
            user: username
          }
          console.log(`[BetService] Creating bet for ${forgottenBet.user}`);
          console.log("[BetService] ", forgottenBet);
          betRef.set(forgottenBet);
        }
      });
    });
  }

  async backupBets() {
    console.log("Getting backup...")
    let betsQuery = await this.db.collection('bets').get();
    let bets = betsQuery.docs.map(querySnap => querySnap.data() as Bet);

    console.log(JSON.stringify(bets));
  }
}
