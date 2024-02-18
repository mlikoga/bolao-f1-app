export class BetPoints {
  pole: number;
  qualifying2: number;
  qualifying3: number;
  fastestLap: number;
  positions: Array<number>;
  extra: Array<number>;
  user: string;
  race: string;

  constructor(user: string, race: string, 
    pole: number = 0, 
    qualifying2: number = 0,
    qualifying3: number = 0,
    fastestLap: number = 0, 
    positions: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    extra: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) 
  {
    this.user = user;
    this.race = race;
    this.pole = pole;
    this.qualifying2 = qualifying2;
    this.qualifying3 = qualifying3;
    this.fastestLap = fastestLap;
    this.positions = positions;
    this.extra = extra;
  }

  get total(): number {
    return this.pole + this.fastestLap +
      this.qualifying2 + this.qualifying3 +
      this.positions.reduce(this.add) +
      this.extra.reduce(this.add);
  }

  static from({ pole, qualifying2, qualifying3, fastestLap, positions, extra, user, race}): BetPoints {
    return new BetPoints(user, race, pole, qualifying2, qualifying3, fastestLap, positions, extra);
  }

  private add(accumulator: number, n: number) {
    return accumulator + n;
  }
}