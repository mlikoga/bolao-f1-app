import { Injectable } from '@angular/core';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { Result } from '../model/result';
import { PointCalculator } from '../points/point-calculator';
import { BetService } from '../services/bet.service';
import { CacheService } from './cache.service';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  db: firebase.firestore.Firestore;

  constructor(private betService: BetService, private cache : CacheService) {
    this.db = firebase.firestore();
  }

  async getResult(race: Race): Promise<Result> {
    let docId = `${race.id}.${race.name}`;
    let cached_result = await this.cache.get(docId);
    if (cached_result) {
      return cached_result;
    }
    let doc = await this.db.collection('results').doc(docId).get();
    if (doc) {
      let result = doc.data() as Result;
      this.cache.set(docId, result);
      return result;
    }
    Promise.reject("Result not found");
  }

  async setRaceResult(race: Race, result: Result): Promise<void> {
    let docId = `${race.id}.${race.name}`;
    this.db.collection('results').doc(docId).set(Object.assign({}, result));
    let bets = await this.betService.getRaceBets(race);
    console.log(bets);
    bets.forEach(bet => this.setPoints(bet, PointCalculator.calculatePoints(result, bet).total()));
  }

  setPoints(bet: Bet, points: number): void {
    this.db.collection("points").doc(`${bet.user}.${bet.race}`).set({
      user: bet.user,
      race: bet.race,
      points: points,
    });
  }

  async getTotalPoints(username: string): Promise<number> {
    let racePoints = await this.db.collection("points")
                       .where("user", "==", username)
                       .get();
    return racePoints.docs.map(querySnap => querySnap.data()["points"])
      .reduce((acc, value) => acc + value);
  }
}
