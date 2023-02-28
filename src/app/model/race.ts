export class Race {
  id: number;
  name: string;
  number: number;
  betEndsAt: Date;
  hasSprint: boolean;

  static all(): Array<Race> {
    return [
      { id: 500, number: 0, name: 'Temporada 2023',  betEndsAt: new Date('2023-03-03T00:00:00-03:00'), hasSprint: false },
      { id: 501, number: 1, name: 'Bahrein',         betEndsAt: new Date('2023-03-04T00:00:00-03:00'), hasSprint: false },
      { id: 502, number: 2, name: 'Arábia Saudita',  betEndsAt: new Date('2023-03-18T00:00:00-03:00'), hasSprint: false },
      { id: 503, number: 3, name: 'Austrália',       betEndsAt: new Date('2023-04-01T00:00:00-03:00'), hasSprint: false },
      { id: 504, number: 4, name: 'Azerbaijão',      betEndsAt: new Date('2023-04-29T00:00:00-03:00'), hasSprint: true  },
      { id: 505, number: 5, name: 'Miami',           betEndsAt: new Date('2023-05-06T00:00:00-03:00'), hasSprint: false },
      { id: 506, number: 6, name: 'Emilia-Romana',   betEndsAt: new Date('2023-05-20T00:00:00-03:00'), hasSprint: false },
      { id: 507, number: 7, name: 'Monaco',          betEndsAt: new Date('2023-05-27T00:00:00-03:00'), hasSprint: false },
      { id: 508, number: 8, name: 'Espanha',         betEndsAt: new Date('2023-06-03T00:00:00-03:00'), hasSprint: false },
      { id: 509, number: 9, name: 'Canadá',          betEndsAt: new Date('2023-06-17T00:00:00-03:00'), hasSprint: false },
      { id: 510, number: 10, name: 'Áustria',        betEndsAt: new Date('2023-07-01T00:00:00-03:00'), hasSprint: true  },
      { id: 511, number: 11, name: 'Grã-Bretanha',   betEndsAt: new Date('2023-07-08T00:00:00-03:00'), hasSprint: false },
      { id: 512, number: 12, name: 'Hungria',        betEndsAt: new Date('2023-07-22T00:00:00-03:00'), hasSprint: false },
      { id: 513, number: 13, name: 'Bélgica',        betEndsAt: new Date('2023-07-29T00:00:00-03:00'), hasSprint: true  },
      { id: 514, number: 14, name: 'Holanda',        betEndsAt: new Date('2023-08-26T00:00:00-03:00'), hasSprint: false },
      { id: 515, number: 15, name: 'Itália (Monza)', betEndsAt: new Date('2023-09-02T00:00:00-03:00'), hasSprint: false },
      { id: 516, number: 16, name: 'Cingapura',      betEndsAt: new Date('2023-09-16T00:00:00-03:00'), hasSprint: false },
      { id: 517, number: 17, name: 'Japão',          betEndsAt: new Date('2023-09-23T00:00:00-03:00'), hasSprint: false },
      { id: 518, number: 18, name: 'Qatar',          betEndsAt: new Date('2023-10-07T00:00:00-03:00'), hasSprint: true  },
      { id: 519, number: 19, name: 'Estados Unidos', betEndsAt: new Date('2023-10-21T00:00:00-03:00'), hasSprint: true  },
      { id: 520, number: 20, name: 'México',         betEndsAt: new Date('2023-10-28T00:00:00-03:00'), hasSprint: false },
      { id: 521, number: 21, name: 'Brasil',         betEndsAt: new Date('2023-11-04T00:00:00-03:00'), hasSprint: true  },
      { id: 522, number: 22, name: 'Las Vegas',      betEndsAt: new Date('2023-11-17T00:00:00-03:00'), hasSprint: false },
      { id: 523, number: 23, name: 'Abu Dhabi',      betEndsAt: new Date('2023-11-25T00:00:00-03:00'), hasSprint: false },
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
