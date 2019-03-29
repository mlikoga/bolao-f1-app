export class Bet {
  pole: string;
  fastestLap: string;
  positions: Array<string>;
  user: string;
  race: number; 

  constructor() {
    this.positions = new Array(10);
  }
}