export class SeasonStanding {
  season: number;
  finished: boolean;
  userStandings: Array<UserNumber>;
  victories: Array<UserNumber>;

  constructor(season: number, finished: boolean, userStandings: Array<UserNumber>, victories: Array<UserNumber>) {
    this.season = season;
    this.finished = finished;
    this.userStandings = userStandings;
    this.victories = victories;
  }

  static empty(season: number): SeasonStanding {
    return new SeasonStanding(season, false, [], []);
  }
}

export interface UserNumber {
  user: string
  number: number
}