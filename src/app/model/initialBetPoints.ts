export class InitialBetPoints {
  champion: number;
  championTeam: number;
  user: string;
  season: number;

  constructor(user?: string, season?: number) {
    this.user = user;
    this.season = season;
    this.champion = 0;
    this.championTeam = 0;
  }

  get total(): number {
    return this.champion + this.championTeam;
  }
}