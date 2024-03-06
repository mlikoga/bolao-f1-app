export interface SeasonStanding {
  season: number;
  finished: boolean;
  userStandings: Array<UserNumber>;
  victories: Array<UserNumber>;
}

export interface UserNumber {
  user: string
  number: number
}