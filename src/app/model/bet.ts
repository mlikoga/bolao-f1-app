export class Bet {
  pole: string;
  qualifying2: string;
  qualifying3: string;
  fastestLap: string;
  positions: Array<string>;
  user: string;
  race: string; 
  forgotten: boolean = false;

  constructor(user: string, race: string, pole?: string, qualifying2?: string, qualifying3?: string, fastestLap?: string, 
    positions?: Array<string>, forgotten?: boolean) {
      
    this.user = user;
    this.race = race;
    this.pole = pole
    this.qualifying2 = qualifying2;
    this.qualifying3 = qualifying3;
    this.fastestLap = fastestLap;
    this.positions = positions || new Array(10);
    this.forgotten = forgotten || false;
  }

  static from(betObj: Bet): Bet {

    // Set defaults for parameter object
  var { user, race, 
        pole = null, 
        qualifying2 = null,
        qualifying3 = null,
        fastestLap = null, 
        positions = new Array(10), 
        forgotten = false
      } = betObj;

    return new Bet(user, race, pole, qualifying2, qualifying3, fastestLap, positions, forgotten);
  }

  static empty(): Bet {
    return new Bet("", "");
  }
}