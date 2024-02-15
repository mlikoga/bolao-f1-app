import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { Race } from '../model/race';
import * as firebase from 'firebase';
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
    this.currentSeason = this.timeService.currentSeason();
    // Firestore data converter
    // Needed to convert between Firestore Timestamp and JS Date
    this.converter = {
      toFirestore: function(race) {
          return {
              ...race,
              practice1StartsAt: firebase.firestore.Timestamp.fromDate(race.practice1StartsAt),
              practice2StartsAt: firebase.firestore.Timestamp.fromDate(race.practice2StartsAt),
              practice3StartsAt: firebase.firestore.Timestamp.fromDate(race.practice3StartsAt),
              qualifyingStartsAt: firebase.firestore.Timestamp.fromDate(race.qualifyingStartsAt),
              raceStartsAt: firebase.firestore.Timestamp.fromDate(race.raceStartsAt),
          };
      },
      fromFirestore: function(snapshot, options){
          const data = snapshot.data(options);
          return new Race(
            data.season, 
            data.number, 
            data.name,
            data.flag,
            data.practice1StartsAt ? data.practice1StartsAt.toDate() : null,
            data.practice2StartsAt ? data.practice2StartsAt.toDate() : null,
            data.practice3StartsAt ? data.practice3StartsAt.toDate() : null,
            data.qualifyingStartsAt ? data.qualifyingStartsAt.toDate() : null,
            data.raceStartsAt ? data.raceStartsAt.toDate() : null,
            data.circuitImageUrl,
            data.circuitName);
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
    return await this.cache.get_and_save(`race.${raceId}`, async () => {
      const raceSnapshot = await this.db.collection('races').doc(raceId).withConverter(this.converter).get();
      return raceSnapshot.data();
    });
  }
}
