import { Component, OnInit } from '@angular/core';
import { DataPoint } from './data-point';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { BetService } from '../services/bet.service';
import { InitialBetService } from '../services/initial-bet.service';
import { RaceService } from '../services/race.service';
import { TimeService } from '../services/time.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  races: Array<Race> = [];
  selectedRace: Race;
  bets: Array<Bet> = [];

  cards: Array<[string, Array<DataPoint>]> = []

  isInitialBet: boolean = false;

  constructor(
    private betService: BetService,
    private initialBetService: InitialBetService,
    private loadingController: LoadingController,
    private raceService : RaceService,
    private timeService : TimeService) { }

  async ngOnInit() {
    let allRaces = await this.raceService.getAllRaces();
    let currentRace = this.timeService.currentRace(allRaces);
    const bettingEnabled = this.timeService.bettingEnabled(allRaces);
    console.log(`Current race: ${currentRace.name}, bettingEnabled: ${bettingEnabled}`);

    this.races = this.timeService.visibleRaces(allRaces, !bettingEnabled);
    if (this.races.length > 0) {
      this.selectedRace = this.races[this.races.length - 1];
    }
    console.log("[Stats] Selected race: ", this.selectedRace.name);
    //this.updateStats(); // onRaceChanged will be called due to change in selectedRace
  }

  onRaceChanged() {
    console.log(`[Stats] Race changed to: ${this.selectedRace.name}`);
    this.updateStats();
  }

  async updateStats() {
    const loading = await this.loadingController.create({
      spinner: "circles",
      translucent: true,
    });
    loading.present();

    this.cards = [];
    if (this.selectedRace) {
      if (this.selectedRace.number == 0) {
        this.isInitialBet = true;
        const bets = await this.initialBetService.getInitialBets(this.timeService.currentSeason());
        //this.cards.push(["Piloto Campeão", this.calculateDataPoints(bets.map(bet => bet.champion))]);
        //this.cards.push(["Equipe campeã", this.calculateDataPoints(bets.map(bet => bet.championTeam))]);

      } else {
        this.isInitialBet = false;
        let bets = await this.betService.getRaceBets(this.selectedRace.id);
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
