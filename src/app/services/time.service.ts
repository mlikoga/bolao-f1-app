import { Injectable } from '@angular/core';
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
    //return now.seconds() > 30;
    return (now.weekday() >= 3 && now.weekday() < 6);
  }
}
