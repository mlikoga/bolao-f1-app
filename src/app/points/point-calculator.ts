import { Bet } from '../model/bet';
import { Result } from '../model/result';
import { BetPoints } from '../model/betPoints';

export class PointCalculator {

  static racePoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  static calculatePoints(result: Result, bet: Bet): BetPoints {
    let betPoints = new BetPoints(bet.user, bet.race);
    if(result.pole === bet.pole) {
      betPoints.pole = 10;
    }
    if(result.fastestLap === bet.fastestLap) {
      betPoints.fastestLap = 10;
    }
    for (let i = 0; i < 10; i++) {
      let result_i = result.positions[i];
      if (result_i === bet.positions[i]) {
        betPoints.positions[i] = this.racePoints[i];
      } else if (result_i === bet.positions[i-1] || result_i === bet.positions[i+1]) {
        betPoints.positions[i] = 0.6 * this.racePoints[i];
      } else if (result_i === bet.positions[i-2] || result_i === bet.positions[i+2]) {
        betPoints.positions[i] = 0.3 * this.racePoints[i];
      } else if (result_i === bet.positions[i-3] || result_i === bet.positions[i+3]) {
        betPoints.positions[i] = 0.1 * this.racePoints[i];
      }

      if (bet.positions.includes(result_i)) {
        betPoints.extra[i] = 2;
      }
    }
    return betPoints;
  }

}
