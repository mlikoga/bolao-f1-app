import { Driver } from '../model/driver';

export class Result {
  pole: string;
  fastestLap: string;
  positions: Array<string>;
  race: number;

  constructor(race: number) {
    this.race = race;
  }
}
