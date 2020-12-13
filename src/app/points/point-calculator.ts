import { Bet } from '../model/bet';
import { InitialBet } from '../model/initial-bet';
import { Result } from '../model/result';
import { BetPoints } from '../model/betPoints';
import { SeasonResult } from 'app/model/seasonResult';
import { InitialBetPoints } from 'app/model/initialBetPoints';

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
      let bet_i = bet.positions[i];
      let result_i = result.positions[i];
      if (bet_i === result_i) {
        betPoints.positions[i] = this.racePoints[i];
      } else if (bet_i === result.positions[i-1] && i > 0) {
        betPoints.positions[i] = 0.6 * this.racePoints[i-1];
      } else if (bet_i === result.positions[i+1] && i < 9) {
        betPoints.positions[i] = 0.6 * this.racePoints[i+1];
      } else if (bet_i === result.positions[i-2] && i > 1) {
        betPoints.positions[i] = 0.3 * this.racePoints[i-2];
      } else if (bet_i === result.positions[i+2] && i < 8) {
        betPoints.positions[i] = 0.3 * this.racePoints[i+2];
      } else if (bet_i === result.positions[i-3] && i > 2) {
        betPoints.positions[i] = 0.1 * this.racePoints[i-3];
      } else if (bet_i === result.positions[i+3] && i < 7) {
        betPoints.positions[i] = 0.1 * this.racePoints[i+3];
      }

      if (result.positions.slice(0, 10).includes(bet_i)) {
        betPoints.extra[i] = 2;
      }
    }
    return betPoints;
  }

  static calculateSeasonPoints(seasonResult: SeasonResult, initialBet: InitialBet): InitialBetPoints {
    let initialBetPoints = new InitialBetPoints(initialBet.user, initialBet.season);

    if (seasonResult.champion === initialBet.champion) {
      initialBetPoints.champion = 20;
    }

    if (seasonResult.bestRestTeam === initialBet.bestRestTeam) {
      initialBetPoints.champion = 40;
    }

    if (seasonResult.bestRestDriver === initialBet.bestRestDriver) {
      initialBetPoints.champion = 60;
    }

    return initialBetPoints;
  }
}
