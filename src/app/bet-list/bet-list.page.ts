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
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.page.html',
  styleUrls: ['./bet-list.page.scss'],
})
export class BetListPage implements OnInit {

  races: Array<Race> = [];
  racePoints: Array<RacePoints> = []

  selectedRaceId: number = 1;
  currentRace: Race = new Race();
  bettingEnabled: boolean = true;
  isAdmin: boolean;
  timeToBetEnd: moment.Duration;
  countdown: string;
  timer: Subscription;

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
    this.currentRace = this.timeService.currentRace();
    this.selectedRaceId = this.currentRace.id;
    this.races = Race.all().filter(race => race.id <= this.currentRace.id);
    this.refresh();
  }

  async ionViewDidEnter() {
    this.bettingEnabled = this.timeService.bettingEnabled();
    let username = await this.authService.getCurrentUsername();
    let hasInitialBet = await this.initialBetService.userHasInitialBet(username);
    if (!hasInitialBet) {
      console.log('User does NOT have initial bet, redirecting to initial bet...');
      this.router.navigate(['tabs', 'bet', 'initial'])
    }
    if (this.bettingEnabled) {
      this.startTimer();
    }
  }

  ionViewDidLeave() {
    if (this.timer) {
      this.timer.unsubscribe();
      console.log('Countdown stopped.')
    }
  }

  startTimer() {
    console.log('Countdown running...')
    this.timeToBetEnd = this.timeService.timeToBetEnd(this.currentRace)
    const intervalMs = 1000;
    const delay = 0;
    this.timer = timer(delay, intervalMs).subscribe(_ => {
      this.countdown = this.timeService.formatDuration(this.timeToBetEnd.subtract(intervalMs));
    });
  }

  async refresh(event?) : Promise<void> {
    console.log('Refreshing bet list...')
    this.resultService.getPoints(this.currentRace.id).then(racePoints => {
      this.racePoints = racePoints;
    });
    if (event) event.target.complete();
  }

  async checkMissingBets() {
    const raceId = this.currentRace.id;
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

  onUserSelected(user: string) {
    if(this.selectedRaceId == 200) {
      return ['/tabs/bet/initial', user]
    }
    return ['/tabs/bet/bet-view', user, this.selectedRaceId]
  }
}
