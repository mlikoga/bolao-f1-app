export class InitialBet {
  driversPositions: Array<string>;
  teamsPositions: Array<string>;
  user: string;
  season: number;
  createdAt: Date;

  constructor() {
    this.driversPositions = new Array(5);
    this.teamsPositions = new Array(5);
  }
}