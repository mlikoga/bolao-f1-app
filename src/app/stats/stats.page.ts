import { Component, OnInit } from '@angular/core';
import { DataPoint } from './data-point';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { BetService } from '../services/bet.service';
import { InitialBetService } from '../services/initial-bet.service';
import { TimeService } from '../services/time.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  races: Array<Race> = [];
  selectedRaceId: number;
  bets: Array<Bet> = [];

  cards: Array<[string, Array<DataPoint>]> = []

  isInitialBet: boolean = false;

  constructor(
    private betService: BetService,
    private initialBetService: InitialBetService,
    private loadingController: LoadingController,
    private timeService : TimeService) { }

  ngOnInit() {
    let currentRace = this.timeService.currentRace();
    const bettingEnabled = this.timeService.bettingEnabled();
    console.log(`Current race: ${currentRace.name}, bettingEnabled: ${bettingEnabled}`);
    this.races = Race.visibleRaces(currentRace, !bettingEnabled);
    if (this.races.length > 0) {
      this.selectedRaceId = this.races[this.races.length - 1].id;
    }
    console.log("[Stats] Selected race: ", this.selectedRaceId);
    this.updateStats();
  }

  onRaceChanged() {
    console.log(`Race changed to: ${this.selectedRaceId}`);
    this.updateStats();
  }

  async updateStats() {
    const loading = await this.loadingController.create({
      spinner: "circles",
      translucent: true,
    });
    loading.present();

    this.cards = [];
    const race = Race.withId(this.selectedRaceId);
    if (race) {
      if (race.number == 0) {
        this.isInitialBet = true;
        const bets = await this.initialBetService.getInitialBets(this.timeService.currentSeason());
        this.cards.push(["Piloto Campeão", this.calculateDataPoints(bets.map(bet => bet.champion))]);
        this.cards.push(["Melhor piloto 2o pelotão", this.calculateDataPoints(bets.map(bet => bet.bestRestDriver))]);
        this.cards.push(["Melhor equipe 2o pelotão", this.calculateDataPoints(bets.map(bet => bet.bestRestTeam))]);

      } else {
        this.isInitialBet = false;
        let bets = await this.betService.getRaceBets(this.selectedRaceId);
        this.cards.push(["Pole", this.calculateDataPoints(bets.map(bet => bet.pole))]);
        this.cards.push(["Volta mais rápida", this.calculateDataPoints(bets.map(bet => bet.fastestLap))]);
        this.cards.push(["Vencedor", this.calculateDataPoints(bets.map(bet => bet.positions[0]))]);
        for (var i = 1; i <= 4; i++) {
          this.cards.push([`${i+1}º`, this.calculateDataPoints(bets.map(bet => bet.positions[i]))]);
        }
      }
    }

    loading.dismiss();
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
