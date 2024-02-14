export class SeasonResult {
  driversPositions: Array<string>;
  teamsPositions: Array<string>;
  season: number;

  constructor(season: number) {
    this.season = season;
    this.driversPositions = new Array<string>(5);
    this.teamsPositions = new Array<string>(5);
  }
}