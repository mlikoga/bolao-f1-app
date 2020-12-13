export class InitialBetPoints {
  champion: number;
  bestRestDriver: number;
  bestRestTeam: number;
  user: string;
  season: number;

  constructor(user?: string, season?: number) {
    this.user = user;
    this.season = season;
    this.champion = 0;
    this.bestRestDriver = 0;
    this.bestRestTeam = 0;
  }

  get total(): number {
    return this.champion + this.bestRestDriver + this.bestRestTeam;
  }
}