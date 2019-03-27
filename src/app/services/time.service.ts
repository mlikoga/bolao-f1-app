import { Injectable } from '@angular/core';
import { Race } from '../model/race';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  // Betting enabled from wednesday to friday
  bettingEnabled(): boolean {
    let now = moment();
    console.log(now.format('DD/MM, dddd, HH:mm:ss'));
    return false;
    //return (now.weekday() >= 3 && now.weekday() < 6);
  }

  currentRace(): Race {
    return { id: 1, name: 'Austrália' } as Race;
  }

  nextRace(time: moment.Moment): Race {
    let races = Race.all().reverse(); // Iterates from last to first
    for(var race of races) {
      let t1 = time.startOf('day');
      let t2 = moment(race.raceStartsAt).startOf('day');
      if (t1.diff(t2, 'days') >= -4) {
        return race;
      }
    }
    return races[races.length - 1];
  }

}
