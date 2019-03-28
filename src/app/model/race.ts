import { Driver } from "selenium-webdriver/chrome";

export class Race {
  id: number;
  name: string;
  raceStartsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 1, name: 'Austrália', raceStartsAt: new Date('2019-03-17T02:10:00Z') },
      { id: 2, name: 'Bahrein', raceStartsAt: new Date('2019-03-31T12:10:00Z') },
      { id: 3, name: 'China', raceStartsAt: new Date('2019-04-14T03:10:00Z') }
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}