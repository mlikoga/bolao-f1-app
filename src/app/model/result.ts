export class Result {
  pole: string;
  fastestLap: string;
  positions: Array<string>;
  race: string;

  constructor(race: string) {
    this.race = race;
  }
}
