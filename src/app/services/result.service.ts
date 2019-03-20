import { Injectable } from '@angular/core';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { Result } from '../model/result';
import { PointCalculator } from '../points/point-calculator';
import { BetService } from '../services/bet.service';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  db: firebase.firestore.Firestore;

  constructor(private betService: BetService) {
    this.db = firebase.firestore();
  }

  async getResult(race: Race): Promise<Result> {
    let docId = `${race.id}.${race.name}`;
    let doc = await this.db.collection('results').doc(docId).get();
    if (doc) {
      return doc.data() as Result;
    }
    Promise.reject("Result not found");
  }

  async setRaceResult(race: Race, result: Result): Promise<void> {
    let docId = `${race.id}.${race.name}`;
    this.db.collection('results').doc(docId).set(Object.assign({}, result));
    let bets = await this.betService.getRaceBets(race);
    bets.forEach(bet => this.setPoints(bet, PointCalculator.calculatePoints(result, bet)));
  }

  setPoints(bet: Bet, points: number) {
    this.db.collection("points").doc(`${bet.user}.${bet.race}`).set({
      points: points
    });
  }
}
