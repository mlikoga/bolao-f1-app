import { Race } from "./race";

export class RacePoints {
  user: string;
  race: number;
  points: number;
  position?: number;

  constructor(user: string, raceId: number, points: number, position: number = 0) {
    this.user = user;
    this.race = raceId;
    this.points = points || 0;
    this.position = position;
  }

  get raceObj(): Race {
    return Race.withId(this.race);
  }

  static empty(user: string, raceId: number) {
    return new RacePoints(user, raceId, 0)
  }

  static from(racePoints: RacePoints) {
    return new RacePoints(racePoints.user, racePoints.race, racePoints.points, racePoints.position);
  }
}