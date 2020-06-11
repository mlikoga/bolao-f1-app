import { TimeService } from './time.service';
import { Race } from '../model/race';
import * as moment from 'moment';

Race.all = () => [
  { id: 1, number: 1, name: 'Austrália', raceStartsAt: new Date('2019-03-17T02:10:00-03:00') },
  { id: 2, number: 2, name: 'Bahrein', raceStartsAt: new Date('2019-03-31T12:10:00-03:00') },
  { id: 3, number: 3, name: 'China', raceStartsAt: new Date('2019-04-14T03:10:00-03:00') },
]

describe('nextRace', () => {
  let timeService = new TimeService();

  it('returns Australia at 2019-01-01', () => {
    let date = moment('2019-01-01T12:00:00-03:00');
    expect(timeService.currentRace(date).name).toBe('Austrália');
  });

  it('still returns Australia at 2019-03-25', () => {
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