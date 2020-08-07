import { Injectable } from '@angular/core';
import { Race } from '../model/race';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  DAYS_TO_OPEN_BET: number = 3;

  constructor() { }


  // Betting enabled from wednesday to friday before the GP
  bettingEnabled(time: moment.Moment = this.now()): boolean {
    const currentRace = this.currentRace(time)
    const daysToRace = this.timeToBetEnd(currentRace, time).asDays();
    console.log(time.format('DD/MM, dddd, HH:mm:ss') + ` days to next GP: ${daysToRace}`);
    return ((currentRace.number == 1 || daysToRace <= this.DAYS_TO_OPEN_BET) && daysToRace > 0);
  }

  currentSeason(time: moment.Moment = this.now()): number {
    return time.year();
  }

  currentRace(time: moment.Moment = this.now()): Race {
    let races = Race.all().reverse(); // Iterates from last to first
    for(var race of races) {
      if (this.timeToBetEnd(race, time).asDays() < this.DAYS_TO_OPEN_BET) {
        return race;
      }
    }
    return races[races.length - 1];
  }

  pastRaces(time: moment.Moment = this.now()): Array<Race> {
    let races = Race.all();
    for(let i = races.length - 1; i >= 0; i--) {
      let race = races[i];
      if (time.isAfter(race.betEndsAt)) {
        return races.slice(0, i + 1);
      }
    }
    return [];
  }

  timeToBetEnd(race: Race, time: moment.Moment = this.now()): moment.Duration {
    const betEnd = moment(race.betEndsAt);
    const diff   = moment.duration(betEnd.diff(time, 'seconds'), 'seconds');

    return diff;
  }

  formatDuration(duration: moment.Duration): string {
    const hours = Math.floor(duration.asHours()).toString().padStart(2, "0");
    const min   = duration.minutes().toString().padStart(2, "0");
    const sec   = duration.seconds().toString().padStart(2, "0");

    return `${hours}:${min}:${sec}`;
  }

  now(): moment.Moment {
    return moment();
  }

}
