import { Injectable } from '@angular/core';
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
import { BetPoints } from 'app/model/betPoints';
import { RaceService } from './race.service';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  db: firebase.firestore.Firestore;

  constructor(
      private betService: BetService,
      private cache : CacheService,
      private raceService: RaceService,
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

    // Once the race result is set, calculate everyone's points and save them
    bets
      .map(bet => PointCalculator.calculatePoints(result, bet))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .forEach((betPoints, position) => this.setPoints(betPoints, position, race));
  }

  async getLastResult(season: number = this.timeService.currentSeason()): Promise<Result> {
    let allRaces = await this.raceService.getAllRaces(season);
    let pastRaces = this.timeService.pastRaces(allRaces).reverse();
    for (let race of pastRaces) {
      let result = await this.getResult(race);
      if (result) {
        return result;
      }
    }

    return null;
  }

  private setPoints(betPoints: BetPoints, position: number, race: Race): void {
    this.db.collection("points").doc(`${betPoints.user}.${betPoints.race}`).set({
      user: betPoints.user,
      race: betPoints.race,
      raceName: race.name,
      points: betPoints.total,
      position: position + 1, // Start with 1
    });
  }

  async getPoints(raceId: string): Promise<Array<RacePoints>> {
    let queryResult = await this.db.collection("points")
                       .where("race", "==", raceId)
                       .orderBy("points", "desc")
                       .get();
    let racePoints = queryResult.docs.map(querySnap => querySnap.data() as RacePoints);
    if (racePoints.length == 0) {
      // Se não tem ainda, cria array de RacePoints zerados
      let users = await this.userService.getUsers(this.timeService.currentSeason());
      for (var user of users) {
        racePoints.push(RacePoints.empty(user.username, raceId));
      }
    }
    return racePoints;
  }

  async getPointsPerRace(username: string, season: number): Promise<Array<RacePoints>> {
    const userPoints = await this.db.collection("points")
                       .where("user", "==", username)
                       .where("season", "==", season)
                       .orderBy("race", "asc")
                       .get();

    return userPoints.docs.map(querySnap => RacePoints.from(querySnap.data() as RacePoints));
  }

  getTotalPoints(userRacePoints: Array<RacePoints>): number {
    return userRacePoints.reduce((acc, value) => acc + value["points"], 0);
  }

  async getUserStandings(season: number): Promise<Array<User>> {
    let users = await this.userService.getUsers(season);
    const userPoints = await Promise.all(users.map(async user => {
      const pointsPerRace = await this.getPointsPerRace(user.username, season);
      const total = this.getTotalPoints(pointsPerRace);
      const lastRacePoints = pointsPerRace.length > 0 ? pointsPerRace[pointsPerRace.length - 1]["points"] : 0;
      const untilNow = total - lastRacePoints;
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


  async getRaceWinners(season: number): Promise<Array<RacePoints>> {
    const queryResult = await this.db.collection("points")
                        .where("position", "==", 1)
                        .where("season", "==", season)
                        .orderBy("race", "asc")
                        .get();

    const racePoints = queryResult.docs.map(querySnap => RacePoints.from(querySnap.data() as RacePoints));
    return racePoints;
  }
}
