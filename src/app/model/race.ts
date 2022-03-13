export class Race {
  id: number;
  name: string;
  number: number;
  betEndsAt: Date;
  hasSprint: boolean;

  static all(): Array<Race> {
    return [
      { id: 400, number: 0, name: 'Temporada 2022',  betEndsAt: new Date('2022-03-18T00:00:00-03:00'), hasSprint: false },
      { id: 401, number: 1, name: 'Bahrein',         betEndsAt: new Date('2022-03-19T00:00:00-03:00'), hasSprint: false },
      { id: 402, number: 2, name: 'Arábia Saudita',  betEndsAt: new Date('2022-03-26T00:00:00-03:00'), hasSprint: false },
      { id: 403, number: 3, name: 'Austrália',       betEndsAt: new Date('2022-04-09T00:00:00-03:00'), hasSprint: false },
      { id: 404, number: 5, name: 'Emilia-Romagna',  betEndsAt: new Date('2022-04-23T00:00:00-03:00'), hasSprint: true  },
      { id: 405, number: 5, name: 'Miami',           betEndsAt: new Date('2022-05-07T00:00:00-03:00'), hasSprint: false },
      { id: 406, number: 6, name: 'Espanha',         betEndsAt: new Date('2022-05-21T00:00:00-03:00'), hasSprint: false },
      { id: 407, number: 7, name: 'Monaco',          betEndsAt: new Date('2022-05-28T00:00:00-03:00'), hasSprint: false },
      { id: 408, number: 8, name: 'Azerbaijão',      betEndsAt: new Date('2022-06-11T00:00:00-03:00'), hasSprint: false },
      { id: 409, number: 9, name: 'Canadá',          betEndsAt: new Date('2022-06-18T00:00:00-03:00'), hasSprint: false },
      { id: 410, number: 10, name: 'Grã-Bretanha',   betEndsAt: new Date('2022-07-02T00:00:00-03:00'), hasSprint: false },
      { id: 411, number: 11, name: 'Áustria',        betEndsAt: new Date('2022-07-09T00:00:00-03:00'), hasSprint: true  },
      { id: 412, number: 12, name: 'França',         betEndsAt: new Date('2022-07-23T00:00:00-03:00'), hasSprint: false },
      { id: 413, number: 13, name: 'Hungria',        betEndsAt: new Date('2022-07-30T00:00:00-03:00'), hasSprint: false },
      { id: 414, number: 14, name: 'Bélgica',        betEndsAt: new Date('2022-08-27T00:00:00-03:00'), hasSprint: false },
      { id: 415, number: 15, name: 'Holanda',        betEndsAt: new Date('2022-09-03T00:00:00-03:00'), hasSprint: false },
      { id: 416, number: 16, name: 'Itália (Monza)', betEndsAt: new Date('2022-09-10T00:00:00-03:00'), hasSprint: false },
      { id: 417, number: 17, name: 'Russia',         betEndsAt: new Date('2022-09-24T00:00:00-03:00'), hasSprint: false },
      { id: 418, number: 18, name: 'Cingapura',      betEndsAt: new Date('2022-10-01T00:00:00-03:00'), hasSprint: false },
      { id: 419, number: 19, name: 'Japão',          betEndsAt: new Date('2022-10-08T00:00:00-03:00'), hasSprint: false },
      { id: 420, number: 20, name: 'EUA',            betEndsAt: new Date('2022-10-22T00:00:00-03:00'), hasSprint: false },
      { id: 421, number: 21, name: 'México',         betEndsAt: new Date('2022-10-29T00:00:00-03:00'), hasSprint: false },
      { id: 422, number: 22, name: 'Brasil',         betEndsAt: new Date('2022-11-12T00:00:00-03:00'), hasSprint: true  },
      { id: 423, number: 23, name: 'Abu Dhabi',      betEndsAt: new Date('2022-11-19T00:00:00-03:00'), hasSprint: false },
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
