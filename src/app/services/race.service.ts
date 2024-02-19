import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Race } from '../model/race';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  db: firebase.firestore.Firestore;
  currentSeason: number;
  converter: firebase.firestore.FirestoreDataConverter<Race>;


  constructor(private cache : CacheService, private timeService: TimeService)
  {
    this.db = firebase.firestore();
    this.db.settings({
      ignoreUndefinedProperties: true,
    });
    this.currentSeason = this.timeService.currentSeason();
    // Firestore data converter
    this.converter = {
      toFirestore: function(race) {
          return { ...race };
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Race(
            data.season, 
            data.number, 
            data.name,
            data.qualifyingStartsAt,
            data.practice1StartsAt,
            data.practice2StartsAt,
            data.practice3StartsAt,
            data.raceStartsAt,
            data.sprintStartsAt,
            data.sprintShootoutStartsAt,
            data.circuitImageUrl,
            data.circuitName,
            data.flag);
      }
    };
  }

  async getAllRaces(season: number = this.currentSeason): Promise<Array<Race>> {
    let races = await this.db.collection("races")
      .where("season", "==", season)
      .orderBy("number", "asc")
      .withConverter(this.converter)
      .get();
    let result = races.docs.map(querySnap => querySnap.data())

    console.log("getAllRaces | ", result);
    return result;
  } 

  async getRace(raceId: string): Promise<Race> {
    return (await this.db.collection('races').doc(raceId).withConverter(this.converter).get()).data();
  }

  saveRace(race: Race) {
    this.db.collection('races').doc(race.id).withConverter(this.converter).set(race, { merge: true });
  }
}
