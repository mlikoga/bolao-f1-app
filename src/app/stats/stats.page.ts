import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DataPoint } from './data-point';
import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { BetService } from '../services/bet.service';
import { InitialBetService } from '../services/initial-bet.service';
import { RaceService } from '../services/race.service';
import { TimeService } from '../services/time.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  @Input() selectedRace: Race = Race.empty();
  
  cards: Array<[string, Array<DataPoint>]> = []

  constructor(
    private betService: BetService,
    private initialBetService: InitialBetService,
    private loadingController: LoadingController,
    private timeService : TimeService) { }

  async ngOnInit() {
    console.log("[Stats] Selected race: ", this.selectedRace.name);
    this.updateStats();
  }

  ngOnChanges() {
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
        const initialBets = await this.initialBetService.getInitialBets(this.timeService.currentSeason());
        this.cards.push([`Piloto campeão`, this.calculateDataPoints(initialBets.map(initialBet => initialBet.driversPositions[0]))]);
        for (var i = 1; i <= 4; i++) {
          this.cards.push([`Piloto ${i+1}º`, this.calculateDataPoints(initialBets.map(initialBet => initialBet.driversPositions[i]))]);
        }
        this.cards.push([`Equipe campeã`, this.calculateDataPoints(initialBets.map(initialBet => initialBet.teamsPositions[0]))]);
        for (var i = 1; i <= 4; i++) {
          this.cards.push([`Equipe ${i+1}º`, this.calculateDataPoints(initialBets.map(initialBet => initialBet.teamsPositions[i]))]);
        }

      } else {
        let bets = await this.betService.getRaceBets(this.selectedRace.id);
        this.cards.push(["Qualifying 1º", this.calculateDataPoints(bets.map(bet => bet.pole))]);
        this.cards.push(["Qualifying 2º", this.calculateDataPoints(bets.map(bet => bet.qualifying2))]);
        this.cards.push(["Qualifying 3º", this.calculateDataPoints(bets.map(bet => bet.qualifying3))]);
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
