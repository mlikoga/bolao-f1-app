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
    return (now.weekday() >= 3 && now.weekday() < 6);
  }
}
