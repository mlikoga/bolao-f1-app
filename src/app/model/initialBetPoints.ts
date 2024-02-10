export class InitialBetPoints {
  
  driversPositions: Array<number>;
  teamsPositions: Array<number>;
  user: string;
  season: number;

  constructor(user?: string, season?: number) {
    this.user = user;
    this.season = season;
    this.driversPositions = [0, 0, 0, 0, 0];
    this.teamsPositions = [0, 0, 0, 0, 0];
  }

  get total(): number {
    return this.driversPositions.reduce(this.add) +
           this.teamsPositions.reduce(this.add);
  }

  private add(accumulator: number, n: number) {
    return accumulator + n;
  }
}