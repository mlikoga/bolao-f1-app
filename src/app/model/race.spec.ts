import { Race } from './race';

const race1 = { id: 1, number: 1, name: 'Austrália', betEndsAt: new Date('2019-03-16T00:00:00-03:00') };
const race2 = { id: 2, number: 2, name: 'Bahrein',   betEndsAt: new Date('2019-03-30T00:00:00-03:00') };
const race3 = { id: 3, number: 3, name: 'China',     betEndsAt: new Date('2019-04-13T00:00:00-03:00') };

Race.all = () => [race1, race2, race3];

describe('visibleRaces', () => {
  it('returns just previous races if includeCurrent is false', () => {
    expect(Race.visibleRaces(race2, false).length).toBe(1);
  });

  it('returns previous races and current if includeCurrent is true', () => {
    expect(Race.visibleRaces(race2, true).length).toBe(2);
  });
});
