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
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { BetPoints } from 'app/model/betPoints';
import { RaceService } from './race.service';
import { SeasonStanding } from 'app/model/seasonStanding';

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

  async getResult(raceId: string): Promise<Result> {
    let docId = raceId;
    return await this.cache.get_and_save(`result.${docId}`, async () => {
      let resultSnapshot = await this.db.collection('results').doc(docId).get();

      if (resultSnapshot.exists) {
        return resultSnapshot.data() as Result;
      }
      return null;
    });
  }

  async setRaceResult(race: Race, result: Result): Promise<void> {
    let docId = race.id;
    this.db.collection('results').doc(docId).set(Object.assign({}, result));
    let bets = await this.betService.getRaceBets(race.id);
    console.log(bets);

    // Once the race result is set, calculate everyone's points
    let betPoints = bets
      .map(bet => PointCalculator.calculatePoints(result, bet))
      .sort((a, b) => a.total - b.total || a.user.toLowerCase().localeCompare(b.user.toLowerCase())) 
      .reverse();

    // Get user with least points
    let lastBetPoints = betPoints[betPoints.length - 1];
    console.log("[RaceService] Last bet points: ", lastBetPoints);

    // Create forgotten bet to users without bet
    let usersWithoutBet = await this.betService.getUsersWithoutBet(race.id);
    this.betService.createForgottenBets(usersWithoutBet, race.id);
    console.log("[RaceService] Created empty bets for users without bet: ", usersWithoutBet);

    // Copy points from last to users without bet
    usersWithoutBet.forEach(username => {
      console.log({...lastBetPoints, user: username});
      betPoints.push(BetPoints.from({...lastBetPoints, user: username}));
    });
    

    // Save points for each user to the database
    betPoints.forEach((betPoints, position) => this.setPoints(betPoints, position, race));
  }

  private setPoints(betPoints: BetPoints, position: number, race: Race): void {
    this.db.collection("points").doc(`${betPoints.user}.${betPoints.race}`).set({
      user: betPoints.user,
      race: betPoints.race,
      raceName: race.name,
      season: race.season,
      points: betPoints.total,
      position: position + 1, // Start with 1
    });
  }

  async getLastResult(season: number = this.timeService.currentSeason()): Promise<Result> {
    let allRaces = await this.raceService.getAllRaces(season);
    let pastRaces = this.timeService.pastRaces(allRaces).reverse();
    for (let race of pastRaces) {
      let result = await this.getResult(race.id);
      if (result) {
        return result;
      }
    }

    return null;
  }

  async getPoints(raceId: string): Promise<Array<RacePoints>> {
    let queryResult = await this.db.collection("points")
                       .where("race", "==", raceId)
                       .orderBy("points", "desc")
                       .get();
    let racePoints = queryResult.docs.map(querySnap => querySnap.data() as RacePoints);
    if (racePoints.length == 0) {
      // Se não tem ainda, cria array de RacePoints zerados
      let season = this.timeService.currentSeason();
      let users = await this.userService.getUsers(season);
      for (var user of users) {
        racePoints.push(RacePoints.empty(user.username, raceId, season));
      }
    }
    return racePoints.sort((a, b) => b.points - a.points || a.user.toLowerCase().localeCompare(b.user.toLowerCase()));
  }

  async getPointsPerRace(username: string, season: number): Promise<Array<RacePoints>> {
    const userPoints = await this.db.collection("points")
                       .where("user", "==", username)
                       .where("season", "==", season)
                       .orderBy("race", "asc")
                       .get();

    const racePoints = userPoints.docs.map(querySnap => RacePoints.from(querySnap.data() as RacePoints));

    // Reorder by race, removing the year and sorting by the number
    const regexRemoveYear = /(20\d\d|[^\d])/g;
    racePoints.sort((a, b) => parseInt(a.race.replace(regexRemoveYear, "")) - parseInt(b.race.replace(regexRemoveYear, "")));

    return racePoints;
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
    const lastStandings = [...userPoints]
      .sort((u1, u2) => u2.untilNow - u1.untilNow || u1.user.username.toLowerCase().localeCompare(u2.user.username.toLowerCase()))
      .map(up => up.user.username);
    const standings = [...userPoints]
      .sort((u1, u2) => u2.total - u1.total || u1.user.username.toLowerCase().localeCompare(u2.user.username.toLowerCase()))
      .map(up => up.user.username);
    const result = userPoints.map( ({user, total}) => {
      return {
        ...user,
        points: total,
        diff: lastStandings.findIndex(username => username === user.username) - standings.findIndex(username => username === user.username)
      };
    }).sort((u1, u2) => u2.points - u1.points || u1.username.toLowerCase().localeCompare(u2.username.toLowerCase()));
    return result;
  }


  async getRaceWinners(season: number): Promise<Array<RacePoints>> {
    const queryResult = await this.db.collection("points")
                        .where("position", "==", 1)
                        .where("season", "==", season)
                        .orderBy("race", "asc")
                        .get();

    const racePoints = queryResult.docs.map(querySnap => RacePoints.from(querySnap.data() as RacePoints));
    // Reorder by race, removing the year and sorting by the number
    const regexRemoveYear = /(20\d\d|[^\d])/g;
    racePoints.sort((a, b) => parseInt(a.race.replace(regexRemoveYear, "")) - parseInt(b.race.replace(regexRemoveYear, "")));

    return racePoints;
  }

  async getSeasonStandings(season: number): Promise<SeasonStanding> {
    let key = `seasonStandings.${season}`;
    let cachedValue = await this.cache.get(key);
    if (cachedValue)
      return cachedValue;

    const queryResult = await this.db.collection("seasonStandings")
                        .doc(season.toString())
                        .get();

    if (queryResult.exists) {
      let result = queryResult.data() as SeasonStanding;
      if (result.finished) {
        this.cache.set(key, result);
      }
      return result
    }

    return null;
  }

  async legacySeasonStandings(firstRace: number, season: number) {
    const queryResult = await this.db.collection("points")
                       .where("race", ">=", firstRace)
                       .where("race", "<", firstRace + 100)
                       .get();

    const points = queryResult.docs.map(querySnap => RacePoints.from(querySnap.data() as RacePoints));
    this.setSeasonStandings(season, points, true);
  }

  async updateSeasonStandings(season: number, finished: boolean = false) {
    const queryResult = await this.db.collection("points")
                       .where("season", "==", season)
                       .get();

    const points = queryResult.docs.map(querySnap => RacePoints.from(querySnap.data() as RacePoints));
    this.setSeasonStandings(season, points, finished);
  }

  setSeasonStandings(season: number, points: RacePoints[], finished: boolean = false) {
    let winners = {};
    let totals = {};
    for (var point of points) {
      if (!totals[point.user]) {
        totals[point.user] = point.points;
      } else {
        totals[point.user] += point.points;
      }
      if (point.position == 1) {
        if (!winners[point.user]) {
          winners[point.user] = 1  
        } else {
          winners[point.user] += 1
        }
      }
    }

    let userStandings = Object.entries(totals)
      .sort((a, b) =>  +b[1] - +a[1])
      .map(([user, points]) => Object.assign({ user: user, number: points }));

    let victories = Object.entries(winners)
      .sort((a, b) =>  +b[1] - +a[1])
      .map(([user, wins]) => Object.assign({ user: user, number: wins }));

    this.db.collection("seasonStandings").doc(`${season}`).set({
      season: season,
      finished: finished,
      userStandings: userStandings,
      victories: victories
    });

    console.log("[ResultService] Updated seasonStandings for season ", season);
  }
}
