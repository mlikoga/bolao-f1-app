import { TimeService } from './time.service';
import { Race } from '../model/race';
import * as moment from 'moment';

describe('nextRace', () => {
  let timeService = new TimeService();

  it('returns Australia at 2019-01-01', () => {
    let date = moment('2019-01-01T12:00:00Z');
    expect(timeService.currentRace(date).name).toBe('Austrália');
  });

  it('still returns Australia at 2019-03-26', () => {
    let date = moment('2019-03-26T12:00:00Z');
    expect(timeService.currentRace(date).name).toBe('Austrália');
  });

  it('returns Bahrein at 2019-03-27', () => {
    let date = moment('2019-03-27T12:00:00Z');
    expect(timeService.currentRace(date).name).toBe('Bahrein');
  });
});