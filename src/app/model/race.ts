export class Race {
  id: number;
  name: string;
  number: number;
  betEndsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 200, number: 0, name: 'Pré-temporada',   betEndsAt: new Date('2020-07-03T00:00:00-03:00') },
      { id: 201, number: 1, name: 'Áustria',         betEndsAt: new Date('2020-07-04T00:00:00-03:00') },
      { id: 202, number: 2, name: 'Estíria',         betEndsAt: new Date('2020-07-11T00:00:00-03:00') },
      { id: 203, number: 3, name: 'Hungria',         betEndsAt: new Date('2020-07-18T00:00:00-03:00') },
      { id: 204, number: 4, name: 'Inglaterra',      betEndsAt: new Date('2020-08-01T00:00:00-03:00') },
      { id: 205, number: 5, name: '70º Aniversário', betEndsAt: new Date('2020-08-08T00:00:00-03:00') },
      { id: 206, number: 6, name: 'Espanha',         betEndsAt: new Date('2020-08-15T00:00:00-03:00') },
      { id: 207, number: 7, name: 'Bélgica',         betEndsAt: new Date('2020-08-29T00:00:00-03:00') },
      { id: 208, number: 8, name: 'Itália',          betEndsAt: new Date('2020-09-05T00:00:00-03:00') },
      { id: 209, number: 9, name: 'Toscana',         betEndsAt: new Date('2020-09-12T00:00:00-03:00') },
      { id: 210, number: 10, name: 'Rússia',         betEndsAt: new Date('2020-09-26T00:00:00-03:00') },
      { id: 211, number: 11, name: 'Alemanha',       betEndsAt: new Date('2020-10-10T00:00:00-03:00') },
      { id: 212, number: 12, name: 'Portugal',       betEndsAt: new Date('2020-10-24T00:00:00-03:00') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }
}
