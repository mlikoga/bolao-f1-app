export class Bet {
  pole: string;
  fastestLap: string;
  positions: Array<string>;
  user: string;
  race: string; 
  forgotten: boolean = false;

  constructor(user: string, race: string, pole?: string, fastestLap?: string, 
    positions?: Array<string>, forgotten?: boolean) {
      
    this.user = user;
    this.race = race;
    this.pole = pole
    this.fastestLap = fastestLap;
    this.positions = positions || new Array(10);
    this.forgotten = forgotten || false;
  }

  static from(betObj: Bet): Bet {

    // Set defaults for parameter object
  var { user, race, 
        pole = null, 
        fastestLap = null, 
        positions = new Array(10), 
        forgotten = false
      } = betObj;

    return new Bet(user, race, pole, fastestLap, positions, forgotten);
  }

  static empty(): Bet {
    return new Bet("", "");
  }
}