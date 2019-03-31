import { Injectable } from '@angular/core';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { RacePoints } from '../model/racePoints';
import { Result } from '../model/result';
import { PointCalculator } from '../points/point-calculator';
import { BetService } from '../services/bet.service';
import { CacheService } from './cache.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  db: firebase.firestore.Firestore;

  constructor(private betService: BetService, private cache : CacheService,
      private userService: UserService) {
    this.db = firebase.firestore();
  }

  async getResult(race: Race): Promise<Result> {
    let docId = `${race.id}.${race.name}`;
    let cached_result = await this.cache.get(docId);
    if (cached_result) {
      console.log('Got cached result!');
      console.log(cached_result);
      return cached_result;
    }
    let queryResult = await this.db.collection('results').where("race", "==", race.id).limit(1).get();
    if (!queryResult.empty) {
      let result = queryResult.docs.pop().data() as Result;
      this.cache.set(docId, result);
      return result;
    }
    throw new Error('Result not found');
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

  async getPoints(raceId: number): Promise<Array<RacePoints>> {
    let queryResult = await this.db.collection("points")
                       .where("race", "==", raceId)
                       .orderBy("points", "desc")
                       .get();
    let racePoints = queryResult.docs.map(querySnap => querySnap.data() as RacePoints);
    if (racePoints.length == 0) {
      // Se não tem ainda, cria array de RacePoints zerados
      let users = await this.userService.getUsers();
      for (var user of users) {
        racePoints.push(new RacePoints(user.username, raceId));
      }
    }
    return racePoints;
  }

  async getTotalPoints(username: string): Promise<number> {
    let userPoints = await this.db.collection("points")
                       .where("user", "==", username)
                       .get();
    return userPoints.docs.map(querySnap => querySnap.data()["points"])
      .reduce((acc, value) => acc + value, 0);
  }
}
