import { Bet } from '../model/bet';

export class PointCalculator {

  static racePoints = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

  static calculatePoints(result: Bet, bet: Bet): number {
    let points = 0;
    if(result.pole === bet.pole) {
      points += 10;
    }
    if(result.fastestLap === bet.fastestLap) {
      points += 10;
    }
    for (let i = 0; i < 10; i++) {
      let result_i = result.positions[i];
      if (result_i === bet.positions[i]) {
        points += this.racePoints[i];
      } else if (result_i === bet.positions[i-1] || result_i === bet.positions[i+1]) {
        points += 0.6 * this.racePoints[i];
      } else if (result_i === bet.positions[i-2] || result_i === bet.positions[i+2]) {
        points += 0.3 * this.racePoints[i];
      } else if (result_i === bet.positions[i-3] || result_i === bet.positions[i+3]) {
        points += 0.1 * this.racePoints[i];
      }

      if (bet.positions.includes(result_i)) {
        points += 2;
      }
    }
    return points;
  }

}
