import { TimeService } from './time.service';
import { Race } from '../model/race';
import * as moment from 'moment';

describe('nextRace', () => {
  let timeService = new TimeService();

  it('returns Australia at 2019-01-01', () => {
    let date = moment('2019-01-01T12:00:00Z');
    expect(timeService.currentRace(date).name).toBe('Australia');
  });

  it('still returns Australia at 2019-03-26', () => {
    let date = moment('2019-03-26T12:00:00Z');
    expect(timeService.currentRace(date).name).toBe('Australia');
  });

  it('returns Bahrein at 2019-03-27', () => {
    let date = moment('2019-03-27T12:00:00Z');
    expect(timeService.currentRace(date).name).toBe('Bahrein');
  });
});

describe('bettingEnabled', () => {
  let timeService = new TimeService();

  it('return false at Friday more than 1 week before GP', () => {
    let date = moment('2019-03-21T12:00:00Z');
    expect(timeService.bettingEnabled(date)).toBeFalsy();
  });

  it('return false at Tuesday before GP', () => {
    let date = moment('2019-03-26T12:00:00Z');
    expect(timeService.bettingEnabled(date)).toBeFalsy();
  });

  it('return true at Wednesday before GP', () => {
    let date = moment('2019-03-27T12:00:00Z');
    expect(timeService.bettingEnabled(date)).toBeTruthy();
  });

  it('return false at Saturday before GP', () => {
    let date = moment('2019-03-30T12:00:00Z');
    expect(timeService.bettingEnabled(date)).toBeFalsy();
  });
});