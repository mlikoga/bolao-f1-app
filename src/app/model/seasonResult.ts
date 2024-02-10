export class SeasonResult {
  driversPositions: Array<string>;
  teamsPositions: Array<string>;
  season: number;

  constructor(season: number) {
    this.season = season;
  }
}