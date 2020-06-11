import { Driver } from "selenium-webdriver/chrome";

export class Race {
  id: number;
  name: string;
  raceStartsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 201, name: 'Áustria',         raceStartsAt: new Date('2020-07-05T10:10:00-03:00') },
      { id: 202, name: 'Estíria',         raceStartsAt: new Date('2020-07-12T10:10:00-03:00') },
      { id: 203, name: 'Hungria',         raceStartsAt: new Date('2020-07-19T10:10:00-03:00') },
      { id: 204, name: 'Inglaterra',      raceStartsAt: new Date('2020-08-02T10:10:00-03:00') },
      { id: 205, name: '70º Aniversário', raceStartsAt: new Date('2020-08-09T10:10:00-03:00') },
      { id: 206, name: 'Espanha',         raceStartsAt: new Date('2020-08-16T10:10:00-03:00') },
      { id: 207, name: 'Bélgica',         raceStartsAt: new Date('2020-08-30T10:10:00-03:00') },
      { id: 208, name: 'Itália',          raceStartsAt: new Date('2020-09-06T10:10:00-03:00') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}
