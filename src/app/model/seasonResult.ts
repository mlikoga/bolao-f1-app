export class SeasonResult {
  champion: string;
  bestRestDriver: string;
  bestRestTeam: string;
  season: number;

  constructor(season: number) {
    this.season = season;
  }
}