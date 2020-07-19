export class BetPoints {
  pole: number;
  fastestLap: number;
  positions: Array<number>;
  extra: Array<number>;
  user: string;
  race: number;

  constructor(user?: string, race?: number) {
    this.user = user;
    this.race = race;
    this.pole = 0;
    this.fastestLap = 0;
    this.positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.extra = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  get total(): number {
    return this.pole + this.fastestLap +
      this.positions.reduce(this.add) +
      this.extra.reduce(this.add);
  }

  private add(accumulator: number, n: number) {
    return accumulator + n;
  }
}