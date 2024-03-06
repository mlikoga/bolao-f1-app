export class Result {
  pole: string;
  qualifying2: string;
  qualifying3: string;
  fastestLap: string;
  positions: Array<string>;
  race: string;

  constructor(race: string) {
    this.race = race;
  }
}
