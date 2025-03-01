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
  bettingEnabled(allRaces: Race[], time: moment.Moment = this.now()): boolean {
    const currentRace = this.currentRace(allRaces, time);
    const daysToRace = this.timeToBetEnd(currentRace, time).asDays();
    console.log(time.format('DD/MM, dddd, HH:mm:ss') + ` days to next GP: ${daysToRace}`);
    return ((currentRace.number == 0 || daysToRace <= this.DAYS_TO_OPEN_BET) && daysToRace > 0);
  }

  currentSeason(time: moment.Moment = this.now()): number {
    if (time.month() < 2) {
      return time.year() - 1; // F1 season starts in March (month 2 because it's zero-based)
    }
    return time.year();
  }

  currentRace(allRaces: Race[], time: moment.Moment = this.now()): Race {
    if (time.isBefore(allRaces[0].betEndsAt)) {
      return allRaces[0];
    }

    // Iterates from last to first
    for (let i = allRaces.length - 1; i >= 0; i--) {
      let race = allRaces[i];
      if (race.betEndsAt) { // if betEndsAt is not undefined
        if (this.timeToBetEnd(race, time).asDays() < this.DAYS_TO_OPEN_BET) {
          return race;
        }
      }
    }
    
    return allRaces[allRaces.length - 1];
  }

  currentRacePhase(race: Race, time: moment.Moment = this.now()): string {
    if (time.isBefore(race.qualifyingStartsAt)) {
      return "qualifying";
    } else if (time.isBefore(race.raceStartsAt)) {
      return "race";
    }
    return "results";
  }

  pastRaces(allRaces: Race[], time: moment.Moment = this.now()): Array<Race> {
    for(let i = allRaces.length - 1; i >= 0; i--) {
      let race = allRaces[i];
      if (time.isAfter(race.betEndsAt)) {
        return allRaces.slice(0, i + 1);
      }
    }
    return [];
  }

  timeToBetEnd(race: Race, time: moment.Moment = this.now()): moment.Duration {
    const betEnd = moment(race.betEndsAt);
    const diff   = moment.duration(betEnd.diff(time, 'seconds'), 'seconds');
    
    return diff;
  }

  visibleRaces(allRaces: Race[], includeCurrent: boolean, time: moment.Moment = this.now()): Array<Race> {
    const currentRace = this.currentRace(allRaces, time);
    const currentIdx = allRaces.findIndex(race => race.id === currentRace.id);
    const lastVisibleIdx = Math.max(0, currentIdx + Number(includeCurrent));

    return allRaces.slice(0, lastVisibleIdx);
  }

  formatDuration(duration: moment.Duration): string {
    const hours = Math.floor(duration.asHours()).toString().padStart(2, "0");
    const min   = duration.minutes().toString().padStart(2, "0");
    const sec   = duration.seconds().toString().padStart(2, "0");

    return `${hours}:${min}:${sec}`;
  }

  now(): moment.Moment {
    return moment();
    //return moment('2024-03-01:00:00-03:00'); // bet period for Bahrein
    //return moment('2024-03-03T12:00:00-03:00'); // post-bet period for Bahrein
    //return moment('2024-03-06T12:00:00-03:00'); // bet period for Arabia
  }

}
