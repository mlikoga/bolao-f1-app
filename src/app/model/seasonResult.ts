export class SeasonResult {
  champion: string;
  championTeam: string;
  season: number;

  constructor(season: number) {
    this.season = season;
  }
}