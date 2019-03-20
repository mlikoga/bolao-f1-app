import { Injectable } from '@angular/core';
import { Race } from '../model/race';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  // Betting enabled from wednesday to friday
  bettingEnabled() : boolean {
    let now = moment();
    console.log(now.format('DD/MM, dddd, HH:mm:ss'));
    return false;
    //return (now.weekday() >= 3 && now.weekday() < 6);
  }

  currentRace() : Race {
    return { id: 1, name: 'Austrália' } as Race;
  }
}
