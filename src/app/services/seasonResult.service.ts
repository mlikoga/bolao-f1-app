import { Injectable } from '@angular/core';
import { Race } from '../model/race';
import { PointCalculator } from '../points/point-calculator';
import { CacheService } from './cache.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { SeasonResult } from 'app/model/seasonResult';
import { InitialBetService } from './initial-bet.service';
import { InitialBetPoints } from 'app/model/initialBetPoints';

@Injectable({
  providedIn: 'root'
})
export class SeasonResultService {

  db: firebase.firestore.Firestore;

  constructor(
      private initialBetService: InitialBetService,
      private cache : CacheService,
    ) {
    this.db = firebase.firestore();
  }

  async getSeasonResult(race: Race): Promise<SeasonResult> {
    const docId = `${race.id}.${race.name}`;
    return await this.cache.get_and_save(docId, async () => {
      const resultSnapshot = await this.db.collection('results').doc(docId).get();

      if (resultSnapshot.exists) {
        return resultSnapshot.data() as SeasonResult;
      }
      return null;
    });
  }

  async setSeasonResult(race: Race, seasonResult: SeasonResult): Promise<void> {
    const docId = `${race.id}.${race.name}`;
    this.db.collection('results').doc(docId).set(Object.assign({}, seasonResult));
    const initialBets = await this.initialBetService.getInitialBets(seasonResult.season);
    initialBets
      .map(initialBet => PointCalculator.calculateSeasonPoints(seasonResult, initialBet))
      .sort((a, b) => a.total - b.total)
      .reverse()
      .forEach((betPoints, position) => this.setPoints(race.id, betPoints, position));
  }

  private setPoints(raceId: number, initialBetPoints: InitialBetPoints, position: number): void {
    const seasonPoints = {
      user: initialBetPoints.user,
      race: raceId,
      points: initialBetPoints.total,
      position: position + 1, // Start with 1
    }
    console.log("Saving: ", seasonPoints);
    this.db.collection("points").doc(`${initialBetPoints.user}.${raceId}`).set(seasonPoints);
  }
}
