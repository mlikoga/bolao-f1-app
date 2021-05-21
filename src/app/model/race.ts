export class Race {
  id: number;
  name: string;
  number: number;
  betEndsAt: Date;


  static all(): Array<Race> {
    return [
      { id: 300, number: 0, name: 'Temporada 2021',  betEndsAt: new Date('2021-03-26T00:00:00-03:00') },
      { id: 301, number: 1, name: 'Bahrein',         betEndsAt: new Date('2021-03-27T00:00:00-03:00') },
      { id: 302, number: 2, name: 'Emilia-Romagna',  betEndsAt: new Date('2021-04-17T00:00:00-03:00') },
      { id: 303, number: 3, name: 'Portugal',        betEndsAt: new Date('2021-05-01T00:00:00-03:00') },
      { id: 304, number: 4, name: 'Espanha',         betEndsAt: new Date('2021-05-08T00:00:00-03:00') },
      { id: 305, number: 5, name: 'Mônaco',          betEndsAt: new Date('2021-05-22T00:00:00-03:00') },
      { id: 306, number: 6, name: 'Azerbaijão',      betEndsAt: new Date('2021-06-05T00:00:00-03:00') },
      { id: 307, number: 7, name: 'Canadá',          betEndsAt: new Date('2021-06-12T00:00:00-03:00') },
      { id: 308, number: 8, name: 'França',          betEndsAt: new Date('2021-06-26T00:00:00-03:00') },
      { id: 309, number: 9, name: 'Áustria',         betEndsAt: new Date('2021-07-03T00:00:00-03:00') },
      { id: 310, number: 10, name: 'Grã-Bretanha',   betEndsAt: new Date('2021-07-17T00:00:00-03:00') },
      { id: 311, number: 11, name: 'Hungria',        betEndsAt: new Date('2021-07-31T00:00:00-03:00') },
      { id: 312, number: 12, name: 'Bélgica',        betEndsAt: new Date('2021-08-28T00:00:00-03:00') },
      { id: 313, number: 13, name: 'Holanda',        betEndsAt: new Date('2021-09-04T00:00:00-03:00') },
      { id: 314, number: 14, name: 'Itália',         betEndsAt: new Date('2021-09-11T00:00:00-03:00') },
      { id: 315, number: 15, name: 'Rússia',         betEndsAt: new Date('2021-09-25T00:00:00-03:00') },
      { id: 316, number: 16, name: 'Cingapura',      betEndsAt: new Date('2021-10-02T00:00:00-03:00') },
      { id: 317, number: 17, name: 'Japão',          betEndsAt: new Date('2021-10-09T00:00:00-03:00') },
      { id: 318, number: 18, name: 'EUA',            betEndsAt: new Date('2021-10-23T00:00:00-03:00') },
      { id: 319, number: 19, name: 'México',         betEndsAt: new Date('2021-10-30T00:00:00-03:00') },
      { id: 320, number: 20, name: 'Brasil',         betEndsAt: new Date('2021-11-06T00:00:00-03:00') },
      { id: 321, number: 21, name: 'Austrália',      betEndsAt: new Date('2021-11-20T00:00:00-03:00') },
      { id: 322, number: 22, name: 'Arábia Saudita', betEndsAt: new Date('2021-12-04T00:00:00-03:00') },
      { id: 323, number: 23, name: 'Abu Dhabi',      betEndsAt: new Date('2021-12-11T00:00:00-03:00') },
    ];
  }

  static withId(id: number): Race {
    return Race.all().find(race => race.id === id);
  }

  static first(): Race {
    return Race.all()[0];
  }

  static firstGP(): Race {
    return Race.all()[1];
  }

  static visibleRaces(currentRace: Race, includeCurrent: boolean): Array<Race> {
    const currentIdx = Race.all().findIndex(race => race.id === currentRace.id);
    const lastVisibleIdx = Math.max(0, currentIdx + Number(includeCurrent));

    return Race.all().slice(0, lastVisibleIdx);
  }

  static last(): Race {
    return Race.all()[Race.all().length - 1];
  }
}
