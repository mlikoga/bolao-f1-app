import { Driver } from "selenium-webdriver/chrome";

export class Race {
  id: number;
  name: string;
  raceStartsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 201, name: 'Austrália',    raceStartsAt: new Date('2020-03-15T02:10:00-03:00') },
      { id: 202, name: 'Bahrein',      raceStartsAt: new Date('2020-03-22T12:10:00-03:00') },
      { id: 203, name: 'Vietnã',       raceStartsAt: new Date('2020-04-05T04:10:00-03:00') },
      { id: 204, name: 'China',        raceStartsAt: new Date('2020-04-19T03:10:00-03:00') },
      { id: 205, name: 'Holanda',      raceStartsAt: new Date('2020-05-03T10:10:00-03:00') },
      { id: 206, name: 'Espanha',      raceStartsAt: new Date('2020-05-10T10:10:00-03:00') },
      { id: 207, name: 'Monaco',       raceStartsAt: new Date('2020-05-24T10:10:00-03:00') },
      { id: 208, name: 'Azerbaijão',   raceStartsAt: new Date('2020-06-07T09:10:00-03:00') },
      { id: 209, name: 'Canadá',       raceStartsAt: new Date('2020-06-14T15:10:00-03:00') },
      { id: 210, name: 'França',       raceStartsAt: new Date('2020-06-28T10:10:00-03:00') },
      { id: 211, name: 'Áustria',      raceStartsAt: new Date('2020-07-05T10:10:00-03:00') },
      { id: 212, name: 'Grã-Bretanha', raceStartsAt: new Date('2020-07-19T11:10:00-03:00') },
      { id: 213, name: 'Hungria',      raceStartsAt: new Date('2020-08-02T10:10:00-03:00') },
      { id: 214, name: 'Bélgica',      raceStartsAt: new Date('2020-08-30T10:10:00-03:00') },
      { id: 215, name: 'Itália',       raceStartsAt: new Date('2020-09-06T10:10:00-03:00') },
      { id: 216, name: 'Singapura',    raceStartsAt: new Date('2020-09-20T09:10:00-03:00') },
      { id: 217, name: 'Rússia',       raceStartsAt: new Date('2020-09-27T08:10:00-03:00') },
      { id: 218, name: 'Japão',        raceStartsAt: new Date('2020-10-11T01:10:00-03:00') },
      { id: 219, name: 'EUA',          raceStartsAt: new Date('2020-10-25T16:10:00-03:00') },
      { id: 220, name: 'México',       raceStartsAt: new Date('2020-11-01T16:10:00-03:00') },
      { id: 221, name: 'Brasil',       raceStartsAt: new Date('2020-11-15T14:10:00-03:00') },
      { id: 222, name: 'Abu Dhabi',    raceStartsAt: new Date('2020-11-29T10:10:00-03:00') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}
