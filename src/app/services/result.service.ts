import { Injectable } from '@angular/core';
import { Race } from '../model/race';
import { Result } from '../model/result';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebase.firestore();
  }

  setRaceResult(race: Race, result: Result): void {
    let docId = `${race.id}.${race.name}`;
    this.db.collection('results').doc(docId).set(Object.assign({}, result));
  }
}
