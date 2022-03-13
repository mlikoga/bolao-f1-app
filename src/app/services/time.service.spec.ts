import { TimeService } from './time.service';
import { Race } from '../model/race';
import * as moment from 'moment';

Race.all = () => [
  { id: 1, number: 0, name: 'Austrália', betEndsAt: new Date('2019-03-16T00:00:00-03:00'), hasSprint: false },
  { id: 2, number: 1, name: 'Bahrein',   betEndsAt: new Date('2019-03-30T00:00:00-03:00'), hasSprint: false },
  { id: 3, number: 2, name: 'China',     betEndsAt: new Date('2019-04-13T00:00:00-03:00'), hasSprint: false },
]

describe('currentRace', () => {
  let timeService = new TimeService();

  it('returns first race if long before season start', () => {
    let date = moment('2019-01-01T12:00:00-03:00');
    expect(timeService.currentRace(date).name).toBe('Austrália');
  });

  it('still returns previous GP if more than 3 days to next one', () => {
    let date = moment('2019-03-25T12:00:00-03:00');
    expect(timeService.currentRace(date).name).toBe('Austrália');
  });

  it('returns Bahrein at 2019-03-27', () => {
    let date = moment('2019-03-27T12:00:00-03:00');
    expect(timeService.currentRace(date).name).toBe('Bahrein');
  });
});

describe('pastRaces', () => {
  let timeService = new TimeService();

  it('returns empty array at 2019-01-01', () => {
    let date = moment('2019-01-01T12:00:00-03:00');
    expect(timeService.pastRaces(date).length).toBe(0);
  });

  it('returns Australia and Bahrein at 2019-04-01', () => {
    let date = moment('2019-04-01T12:00:00-03:00');
    expect(timeService.pastRaces(date).length).toBe(2);
  });

  it('returns all races at 2019-12-31', () => {
    let date = moment('2019-12-31T12:00:00-03:00');
    expect(timeService.pastRaces(date).length).toBe(3);
  });
});

describe('bettingEnabled', () => {
  let timeService = new TimeService();

  it('return true more than 1 week before 1st GP', () => {
    let date = moment('2019-01-01T12:00:00-03:00');
    expect(timeService.bettingEnabled(date)).toBeTruthy();
  });

  it('return false at Friday more than 1 week before 2nd GP', () => {
    let date = moment('2019-03-21T12:00:00-03:00');
    expect(timeService.bettingEnabled(date)).toBeFalsy();
  });

  it('return false at Monday before GP', () => {
    let date = moment('2019-03-25T12:00:00-03:00');
    expect(timeService.bettingEnabled(date)).toBeFalsy();
  });

  it('return true at Wednesday before GP', () => {
    let date = moment('2019-03-27T12:00:00-03:00');
    expect(timeService.bettingEnabled(date)).toBeTruthy();
  });

  it('return false at Saturday before GP', () => {
    let date = moment('2019-03-30T12:00:00-03:00');
    expect(timeService.bettingEnabled(date)).toBeFalsy();
  });
});

describe('timeToBetEnd', () => {
  const timeService = new TimeService();
  const race = { id: 1, number: 1, name: 'Europa', betEndsAt: new Date('2020-08-08T00:00:00-03:00') } as Race;

  it('returns milisseconds to bet end', () => {
    const date = moment('2020-08-07T18:40:50-03:00');
    const expected = moment.duration('05:19:10')
    expect(timeService.timeToBetEnd(race, date).asSeconds()).toBe(expected.asSeconds());
  });

  it('returns more than 24h as hours', () => {
    const date = moment('2020-08-06T18:40:50-03:00');
    const expected = moment.duration('29:19:10')
    expect(timeService.timeToBetEnd(race, date).asSeconds()).toBe(expected.asSeconds());
  });
});

describe('formatDuration', () => {
  const timeService = new TimeService();

  it('returns hh:mm:ss', () => {
    const duration = moment.duration('05:19:10');
    expect(timeService.formatDuration(duration)).toBe('05:19:10');
  });

  it('returns more than 24h as hours', () => {
    const duration = moment.duration(2, 'days');
    expect(timeService.formatDuration(duration)).toBe('48:00:00');
  });
});