export class BetPoints {
  pole: number;
  fastestLap: number;
  positions: Array<number>;
  extra: Array<number>;
  user: string;
  race: string;

  constructor(user: string, race: string, 
    pole: number = 0, 
    fastestLap: number = 0, 
    positions: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    extra: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) 
  {
    this.user = user;
    this.race = race;
    this.pole = pole;
    this.fastestLap = fastestLap;
    this.positions = positions;
    this.extra = extra;
  }

  get total(): number {
    return this.pole + this.fastestLap +
      this.positions.reduce(this.add) +
      this.extra.reduce(this.add);
  }

  static from({ pole, fastestLap, positions, extra, user, race}): BetPoints {
    return new BetPoints(user, race, pole, fastestLap, positions, extra);
  }

  private add(accumulator: number, n: number) {
    return accumulator + n;
  }
}