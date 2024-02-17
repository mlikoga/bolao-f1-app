import * as moment from 'moment';

export class Race {
  flag: string;
  name: string;
  number: number;
  season: number;
  practice1StartsAt: Date;
  practice2StartsAt: Date;
  practice3StartsAt: Date;
  qualifyingStartsAt: Date; // qualifying is the only Date required
  raceStartsAt: Date;
  circuitImageUrl: string;
  circuitName: string;

  get id(): string {
    return `${this.season}.${this.number}`;
  }
  get betEndsAt(): Date {
    return this.qualifyingStartsAt;
  }

  get dateStr(): string {
    if (this.practice1StartsAt && this.raceStartsAt) {
      let startDate = moment(this.practice1StartsAt);
      let endDate   = moment(this.raceStartsAt);

      if (startDate.month() === endDate.month()) {
        return `${startDate.format("MMM DD")} - ${endDate.format("DD")}`;
      }
     
      return `${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`;
    }
    
    return "";
  }

  constructor(season: number, number: number, name: string, qualifyingStartsAt: Date, 
    practice1StartsAt: Date = null, practice2StartsAt: Date = null, practice3StartsAt: Date = null, raceStartsAt: Date = null, 
    circuitImageUrl: string = null, circuitName: string = null, flag: string = null) {
    this.season = season;
    this.number = number;
    this.name = name;
    this.flag = flag;
    this.practice1StartsAt = practice1StartsAt;
    this.practice2StartsAt = practice2StartsAt;
    this.practice3StartsAt = practice3StartsAt;
    this.qualifyingStartsAt = qualifyingStartsAt;
    this.raceStartsAt = raceStartsAt;
    this.circuitImageUrl = circuitImageUrl;
    this.circuitName = circuitName;
  }

  static empty(): Race {
    return new Race(2024, -1, "Loading...", new Date());
  }
}
