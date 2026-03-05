import { Driver } from './driver';
export class Team {
  name: string;

  static all() : Array<Team> {
    const teams = Array.from(new Set(Driver.all().map(driver => driver.team)))
      .filter(team => team && team !== '-')
      .map(team => ({ name: team }));
    return teams;
  }
}
