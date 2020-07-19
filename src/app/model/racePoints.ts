import { Race } from "./race";

export class RacePoints {
  user: string;
  race: number;
  points: number;

  constructor(racePoints: RacePoints) {
    this.user = racePoints.user;
    this.race = racePoints.race;
    this.points = racePoints.points || 0;
  }

  get raceObj(): Race {
    return Race.withId(this.race);
  }

  static empty(user: string, raceId: number) {
    return new RacePoints({ user: user, race: raceId, points: 0 } as RacePoints)
  }
}