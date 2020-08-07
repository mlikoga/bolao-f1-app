export class Race {
  id: number;
  name: string;
  number: number;
  raceStartsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 200, number: 0, name: 'Pré-temporada',   raceStartsAt: new Date('2020-07-04T10:10:00-03:00') },
      { id: 201, number: 1, name: 'Áustria',         raceStartsAt: new Date('2020-07-05T10:10:00-03:00') },
      { id: 202, number: 2, name: 'Estíria',         raceStartsAt: new Date('2020-07-12T10:10:00-03:00') },
      { id: 203, number: 3, name: 'Hungria',         raceStartsAt: new Date('2020-07-19T10:10:00-03:00') },
      { id: 204, number: 4, name: 'Inglaterra',      raceStartsAt: new Date('2020-08-02T10:10:00-03:00') },
      { id: 205, number: 5, name: '70º Aniversário', raceStartsAt: new Date('2020-08-09T10:10:00-03:00') },
      { id: 206, number: 6, name: 'Espanha',         raceStartsAt: new Date('2020-08-16T10:10:00-03:00') },
      { id: 207, number: 7, name: 'Bélgica',         raceStartsAt: new Date('2020-08-30T10:10:00-03:00') },
      { id: 208, number: 8, name: 'Itália',          raceStartsAt: new Date('2020-09-06T10:10:00-03:00') },
      { id: 209, number: 9, name: 'Toscana',         raceStartsAt: new Date('2020-09-13T10:10:00-03:00') },
      { id: 210, number: 10, name: 'Rússia',         raceStartsAt: new Date('2020-09-27T10:10:00-03:00') },
      { id: 211, number: 11, name: 'Alemanha',       raceStartsAt: new Date('2020-10-11T10:10:00-03:00') },
      { id: 212, number: 12, name: 'Portugal',       raceStartsAt: new Date('2020-10-25T10:10:00-03:00') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}
