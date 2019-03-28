import { Injectable } from '@angular/core';
import { Race } from '../model/race';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  // Betting enabled from wednesday to friday before the GP
  bettingEnabled(time: moment.Moment = moment()): boolean {
    let daysToRace = this.daysToRace(time, this.currentRace(time));
    console.log(time.format('DD/MM, dddd, HH:mm:ss') + ` days to next GP: ${daysToRace}`);
    return (daysToRace >= -3 && daysToRace < -1);
  }

  currentRace(time: moment.Moment = moment()): Race {
    let races = Race.all().reverse(); // Iterates from last to first
    for(var race of races) {
      if (this.daysToRace(time, race) >= -4) {
        return race;
      }
    }
    return races[races.length - 1];
  }

  daysToRace(time: moment.Moment, race: Race) {
    let t1 = time.startOf('day');
    let t2 = moment(race.raceStartsAt).startOf('day');
    return t1.diff(t2, 'days');
  }

}
