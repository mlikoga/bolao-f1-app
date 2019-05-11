import { Component, OnInit } from '@angular/core';
import { DataPoint } from './dataPoint';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { BetService } from '../services/bet.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  races: Array<Race> = [];
  selectedRaceId: number = 1;
  currentRace: Race;
  bets: Array<Bet> = [];

  poleData: Array<DataPoint> = [];
  fastestData: Array<DataPoint> = [];
  winnerData: Array<DataPoint> = [];


  constructor(private betService: BetService, private timeService : TimeService) { }

  ngOnInit() {
    this.currentRace = this.timeService.currentRace();
    this.selectedRaceId = this.currentRace.id;
    this.races = Race.all().filter(race => race.id <= this.currentRace.id);
    this.updateStats();
  }

  onRaceChanged() {
    console.log(`Race changed to: ${this.selectedRaceId}`);
    this.updateStats();
  }

  async updateStats() {
    let bets = await this.betService.getRaceBets(this.currentRace);
    this.poleData = this.calculateDataPoints(bets.map(bet => bet.pole));
    this.fastestData = this.calculateDataPoints(bets.map(bet => bet.fastestLap));
    this.winnerData = this.calculateDataPoints(bets.map(bet => bet.positions[0]));
  }

  calculateDataPoints(bets: Array<string>) {
    const counts = bets.reduce((acc, pole) => {
        acc[pole] = (acc[pole] || 0) + 1;
        return acc;
      }, {});
    let dataPoints = [];
    for (let label of Object.keys(counts)) {
      dataPoints.push(new DataPoint(label, counts[label]));
    }
    return dataPoints.sort((d1, d2) => d2.value - d1.value);
  }

}
