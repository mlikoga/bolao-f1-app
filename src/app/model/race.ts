import * as moment from 'moment';

export class Race {
  flag: string;
  name: string;
  number: number;
  season: number;
  practice1StartsAt: string;
  practice2StartsAt: string;
  practice3StartsAt: string;
  qualifyingStartsAt: string; // qualifying is the only Date required
  raceStartsAt: string;
  sprintStartsAt: string;
  sprintShootoutStartsAt: string;
  circuitImageUrl: string;
  circuitName: string;
  linkName: string;

  get id(): string {
    return `${this.season}.${this.number}`;
  }
  get betEndsAt(): string {
    return this.qualifyingStartsAt;
  }

  get dateStr(): string {
    if (this.practice1StartsAt && this.raceStartsAt) {
      let startDate = moment(this.practice1StartsAt);
      let endDate   = moment(this.raceStartsAt);

      if (startDate.dayOfYear() === endDate.dayOfYear()) {
        return `${startDate.format("MMM DD")}`;
      }

      if (startDate.month() === endDate.month()) {
        return `${startDate.format("MMM DD")} - ${endDate.format("DD")}`;
      }
     
      return `${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`;
    }
    
    return "";
  }

  constructor(season: number, number: number, name: string, qualifyingStartsAt: string, 
    practice1StartsAt: string = null, practice2StartsAt: string = null, practice3StartsAt: string = null, raceStartsAt: string = null, 
    sprintStartsAt: string = null, sprintShootoutStartsAt: string = null,
    circuitImageUrl: string = null, circuitName: string = null, flag: string = null, linkName: string = null) {
    this.season = season;
    this.number = number;
    this.name = name;
    this.flag = flag;
    this.practice1StartsAt = practice1StartsAt;
    this.practice2StartsAt = practice2StartsAt;
    this.practice3StartsAt = practice3StartsAt;
    this.qualifyingStartsAt = qualifyingStartsAt;
    this.raceStartsAt = raceStartsAt;
    this.sprintStartsAt = sprintStartsAt;
    this.sprintShootoutStartsAt = sprintShootoutStartsAt;
    this.circuitImageUrl = circuitImageUrl;
    this.circuitName = circuitName;
    this.linkName = linkName;
  }

  isBetOpen(time: moment.Moment = moment()): boolean {
    return time.isBefore(this.betEndsAt);
  }

  static empty(): Race {
    return new Race(2024, -1, "Loading...", moment().toISOString(true));
  }
}
