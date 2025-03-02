import { Race } from "./race";

export class RacePoints {
  user: string;
  race: string;
  raceName: string;
  season: number;
  points: number;
  position?: number;

  constructor(user: string, raceId: string, raceName: string, season: number, points: number, position: number = 0) {
    this.user = user;
    this.race = raceId;
    this.raceName = raceName;
    this.season = season;
    this.points = points || 0;
    this.position = position;
  }

  static empty(user: string, raceId: string, season: number) {
    return new RacePoints(user, raceId, "", season, 0)
  }

  static from(racePoints: RacePoints) {
    return new RacePoints(
      racePoints.user,
      racePoints.race,
      racePoints.raceName,
      racePoints.season,
      racePoints.points,
      racePoints.position,
    );
  }
}