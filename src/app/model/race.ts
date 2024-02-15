import * as moment from 'moment';

export class Race {
  flag: string;
  name: string;
  number: number;
  season: number;
  practice1StartsAt: Date;
  practice2StartsAt: Date;
  practice3StartsAt: Date;
  qualifyingStartsAt: Date;
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

  constructor(season: number, number: number, name: string, flag: string, practice1StartsAt: Date, 
    practice2StartsAt: Date, practice3StartsAt: Date, qualifyingStartsAt: Date, raceStartsAt: Date, 
    circuitImageUrl: string, circuitName: string) {
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
    return new Race(2024, -1, "Loading...", "", new Date(), new Date(), new Date(), new Date(), new Date(), "", "");
  }
}
