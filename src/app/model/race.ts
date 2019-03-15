export class Race {
  id: number;
  name: string;
  race_starts_at: Date;


  static all: Array<Race> = [
    {id: 1, name: 'Australia', race_starts_at: new Date('2019-03-17T02:10:00Z') }
  ]
}