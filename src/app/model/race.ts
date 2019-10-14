import { Driver } from "selenium-webdriver/chrome";

export class Race {
  id: number;
  name: string;
  raceStartsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 1, name: 'Austrália', raceStartsAt: new Date('2019-03-17T02:10:00-03:00') },
      { id: 2, name: 'Bahrein', raceStartsAt: new Date('2019-03-31T12:10:00-03:00') },
      { id: 3, name: 'China', raceStartsAt: new Date('2019-04-14T03:10:00-03:00') },
      { id: 4, name: 'Azerbaijão', raceStartsAt: new Date('2019-04-28T09:10:00-03:00') },
      { id: 5, name: 'Espanha', raceStartsAt: new Date('2019-05-12T10:10:00-03:00') },
      { id: 6, name: 'Monaco', raceStartsAt: new Date('2019-05-26T10:10:00-03:00') },
      { id: 7, name: 'Canadá', raceStartsAt: new Date('2019-06-09T15:10:00-03:00') },
      { id: 8, name: 'França', raceStartsAt: new Date('2019-06-23T10:10:00-03:00') },
      { id: 9, name: 'Áustria', raceStartsAt: new Date('2019-06-30T10:10:00-03:00') },
      { id: 10, name: 'Grã-Bretanha', raceStartsAt: new Date('2019-07-14T11:10:00-03:00') },
      { id: 11, name: 'Alemanha', raceStartsAt: new Date('2019-07-28T10:10:00-03:00') },
      { id: 12, name: 'Hungria', raceStartsAt: new Date('2019-08-04T10:10:00-03:00') },
      { id: 13, name: 'Bélgica', raceStartsAt: new Date('2019-09-01T10:10:00-03:00') },
      { id: 14, name: 'Itália', raceStartsAt: new Date('2019-09-08T10:10:00-03:00') },
      { id: 15, name: 'Singapura', raceStartsAt: new Date('2019-09-22T09:10:00-03:00') },
      { id: 16, name: 'Rússia', raceStartsAt: new Date('2019-09-29T08:10:00-03:00') },
      { id: 17, name: 'Japão', raceStartsAt: new Date('2019-10-13T02:10:00-03:00') },
      { id: 18, name: 'México', raceStartsAt: new Date('2019-10-27T16:10:00-03:00') },
      { id: 19, name: 'EUA', raceStartsAt: new Date('2019-11-03T17:10:00-03:00') },
      { id: 20, name: 'Brasil', raceStartsAt: new Date('2019-11-17T15:10:00-03:00') },
      { id: 21, name: 'Abu Dhabi', raceStartsAt: new Date('2019-12-01T11:10:00-03:00') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}
