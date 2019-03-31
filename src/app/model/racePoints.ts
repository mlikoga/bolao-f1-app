export class RacePoints {
  user: string;
  race: number;
  points: number;

  constructor(username: string, raceId: number) {
    this.user = username;
    this.race = raceId;
    this.points = 0;
  }
}