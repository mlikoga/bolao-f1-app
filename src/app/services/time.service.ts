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
    let currentRace = this.currentRace(time)
    let daysToRace = this.daysToRace(time, currentRace);
    console.log(time.format('DD/MM, dddd, HH:mm:ss') + ` days to next GP: ${daysToRace}`);
    return ((currentRace.number == 1 || daysToRace >= -5) && daysToRace < -1);
  }

  currentSeason(time: moment.Moment = moment()): number {
    return time.year();
  }

  currentRace(time: moment.Moment = moment()): Race {
    let races = Race.all().reverse(); // Iterates from last to first
    for(var race of races) {
      if (this.daysToRace(time, race) >= -5) {
        return race;
      }
    }
    return races[races.length - 1];
  }

  pastRaces(time: moment.Moment = moment()): Array<Race> {
    let races = Race.all();
    for(let i = races.length - 1; i >= 0; i--) {
      let race = races[i];
      if (time.isAfter(race.raceStartsAt)) {
        return races.slice(0, i + 1);
      }
    }
    return [];
  }

  daysToRace(time: moment.Moment, race: Race) {
    let t1 = time.startOf('day');
    let t2 = moment(race.raceStartsAt).startOf('day');
    return t1.diff(t2, 'days');
  }

  timeToBetEnd(race: Race, time: moment.Moment = moment()): moment.Duration {
    const betEnd = moment(race.raceStartsAt).startOf('day').subtract(1, 'day');
    const diff   = moment.duration(betEnd.diff(time, 'seconds'), 'seconds');

    return diff;
  }

  formatDuration(duration: moment.Duration): string {
    const hours = Math.floor(duration.asHours()).toString().padStart(2, "0");
    const min   = duration.minutes().toString().padStart(2, "0");
    const sec   = duration.seconds().toString().padStart(2, "0");

    return `${hours}:${min}:${sec}`;
  }

}
