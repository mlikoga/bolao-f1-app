import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { BetService } from '../services/bet.service';
import { InitialBetService } from '../services/initial-bet.service';
import { Race } from '../model/race';
import { RacePoints } from '../model/racePoints';
import { ResultService } from '../services/result.service';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.page.html',
  styleUrls: ['./bet-list.page.scss'],
})
export class BetListPage implements OnInit {

  races: Array<Race> = [];
  racePoints: Array<RacePoints> = []

  selectedRaceId: number = 1;
  currentRaceId: number;
  bettingEnabled: boolean;
  isAdmin: boolean;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private betService: BetService,
    private initialBetService: InitialBetService,
    private resultService: ResultService,
    private router: Router,
    private timeService : TimeService) { 
  }
  
  async ngOnInit() {
    this.isAdmin = await this.authService.isSuperAdmin();
    this.currentRaceId = this.timeService.currentRace().id;
    this.selectedRaceId = this.currentRaceId;
    this.races = Race.all().filter(race => race.id <= this.currentRaceId);
    this.resultService.getPoints(this.currentRaceId).then(racePoints => {
      this.racePoints = racePoints;
    });
  }

  async ionViewWillEnter() {
    this.bettingEnabled = this.timeService.bettingEnabled();
    let username = await this.authService.getCurrentUsername();
    let hasInitialBet = await this.initialBetService.userHasInitialBet(username);
    if (!hasInitialBet) {
      console.log('User does NOT have initial bet, redirecting to initial bet...');
      this.router.navigate(['tabs', 'bet', 'initial'])
    } 
  }

  async checkMissingBets() {
    const raceId = this.currentRaceId;
    const usersWithoutBet = await this.betService.getUsersWithoutBet(raceId);
    if (usersWithoutBet.length > 0) {
      this.alertService.confirm(`Deseja criar apostas para ${usersWithoutBet}?`, () => {
        console.log(`Resposta confirm: ok`);
        this.betService.createBets(usersWithoutBet, raceId);
      });
    } else {
      this.alertService.alert('Nenhum usuário deixou de apostar!', 'Apostas');
    }
  }

  onRaceChanged() {
    console.log(`Race changed to: ${this.selectedRaceId}`);
    this.resultService.getPoints(this.selectedRaceId).then(racePoints => {
      this.racePoints = racePoints;
    });
  }
}
