import { Injectable } from '@angular/core';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { RacePoints } from '../model/racePoints';
import { Result } from '../model/result';
import { User } from '../model/user';
import { PointCalculator } from '../points/point-calculator';
import { BetService } from '../services/bet.service';
import { CacheService } from './cache.service';
import { TimeService } from './time.service';
import { UserService } from './user.service';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  db: firebase.firestore.Firestore;

  constructor(
      private betService: BetService, 
      private cache : CacheService,
      private timeService: TimeService,
      private userService: UserService,
    ) {
    this.db = firebase.firestore();
  }

  async getResult(race: Race): Promise<Result> {
    let docId = `${race.id}.${race.name}`;
    return await this.cache.get_and_save(docId, async () => {
      let resultSnapshot = await this.db.collection('results').doc(docId).get();

      if (resultSnapshot.exists) {
        return resultSnapshot.data() as Result;
      }
      return null;
    });
  }

  async setRaceResult(race: Race, result: Result): Promise<void> {
    let docId = `${race.id}.${race.name}`;
    this.db.collection('results').doc(docId).set(Object.assign({}, result));
    let bets = await this.betService.getRaceBets(race.id);
    console.log(bets);
    bets.forEach(bet => this.setPoints(bet, PointCalculator.calculatePoints(result, bet).total()));
  }

  async getLastResult(): Promise<Result> {
    let pastRaces = this.timeService.pastRaces().reverse();
    for (let race of pastRaces) {
      let result = await this.getResult(race);
      if (result) {
        return result;
      }
    }

    return null;
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

  async getPointsPerRace(username: string): Promise<Array<number>> {
    const userPoints = await this.db.collection("points")
                       .where("user", "==", username)
                       .where("race", ">", 200) // hard-coded for season 2020
                       .orderBy("race", "asc")
                       .get();

    return userPoints.docs.map(querySnap => querySnap.data()["points"]);
  }

  async getTotalPoints(username: string): Promise<number> {
    const userPoints = await this.getPointsPerRace(username);
    return userPoints.reduce((acc, value) => acc + value, 0);
  }

  async getUserStandings(): Promise<Array<User>> {
    let users = await this.userService.getUsers();
    const userPoints = await Promise.all(users.map(async user => {
      const pointsPerRace = await this.getPointsPerRace(user.username);
      const total = pointsPerRace.reduce((acc, value) => acc + value, 0);
      const untilNow = total - pointsPerRace[pointsPerRace.length - 1];
      return { user, untilNow, total };
    }));
    const lastStandings = [...userPoints].sort((u1, u2) => u2.untilNow - u1.untilNow).map(up => up.user.username);
    const standings = [...userPoints].sort((u1, u2) => u2.total - u1.total).map(up => up.user.username);
    const result = userPoints.map( ({user, total}) => {
      return {
        ...user,
        points: total,
        diff: lastStandings.findIndex(username => username === user.username) - standings.findIndex(username => username === user.username)
      };
    }).sort((u1, u2) => u2.points - u1.points);
    return result;
  }
}
