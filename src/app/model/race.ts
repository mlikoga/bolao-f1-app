import { Driver } from "selenium-webdriver/chrome";

export class Race {
  id: number;
  name: string;
  raceStartsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 1, name: 'Austrália', raceStartsAt: new Date('2019-03-17T02:10:00Z') },
      { id: 2, name: 'Bahrein', raceStartsAt: new Date('2019-03-31T12:10:00Z') },
      { id: 3, name: 'China', raceStartsAt: new Date('2019-04-14T03:10:00Z') },
      { id: 4, name: 'Azerbaijão', raceStartsAt: new Date('2019-04-28T09:10:00Z') },
      { id: 5, name: 'Espanha', raceStartsAt: new Date('2019-05-12T10:10:00Z') },
      { id: 6, name: 'Monaco', raceStartsAt: new Date('2019-05-26T10:10:00Z') },
      { id: 7, name: 'Canadá', raceStartsAt: new Date('2019-06-09T15:10:00Z') },
      { id: 8, name: 'França', raceStartsAt: new Date('2019-06-23T10:10:00Z') },
      { id: 9, name: 'Áustria', raceStartsAt: new Date('2019-06-30T10:10:00Z') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}