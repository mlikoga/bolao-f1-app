import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { BetService } from '../services/bet.service';
import { Race } from '../model/race';
import { RacePoints } from '../model/racePoints';
import { RaceService } from '../services/race.service';
import { ResultService } from '../services/result.service';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';
import { timer, Subscription } from 'rxjs';
import { InitialBetService } from 'app/services/initial-bet.service';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.page.html',
  styleUrls: ['./bet-list.page.scss'],
})
export class BetListPage implements OnInit {

  races: Array<Race> = [];
  racePoints: Array<RacePoints> = []

  selectedRace: Race = Race.empty();
  currentRace: Race = Race.empty();
  currentSeason: number;
  bettingEnabled: boolean = true;
  betLink: string;
  isAdmin: boolean;
  timeToBetEnd: moment.Duration;
  countdown: string;
  timer: Subscription;
  userHasBet: boolean = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private betService: BetService,
    private initialBetService: InitialBetService,
    private raceService: RaceService,
    private resultService: ResultService,
    private router: Router,
    private timeService : TimeService) {
  }

  async ngOnInit() {
    let username       = await this.authService.getCurrentUsername();
    this.isAdmin       = await this.authService.isSuperAdmin();
    this.currentSeason = this.timeService.currentSeason();
    
    let allRaces      = await this.raceService.getAllRaces();
    this.currentRace  = this.timeService.currentRace(allRaces);
    this.selectedRace = this.currentRace;
    this.betLink      = this.currentRace.number == 0 ? '/tabs/bet/initial' : '/tabs/bet/bet';
    console.log(`[bet-list] Season ${this.currentSeason} | Current race: `, this.currentRace);

    this.races = allRaces.filter(race => race.number <= this.currentRace.number);
    this.bettingEnabled = this.timeService.bettingEnabled(allRaces);
    console.log("[bet-list] bettingEnabled: ", this.bettingEnabled);

    if (this.currentRace.number == 0) {
      let bet = await this.initialBetService.getUserInitialBet(username);  
      this.userHasBet = bet != null;
    } else {
      let bet = await this.betService.getUserBet(username, this.currentRace.id);
      this.userHasBet = bet != null;
    }
    
    this.refresh();
    if (this.bettingEnabled) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      this.timer.unsubscribe();
      console.log('[bet-list] Countdown stopped.')
    }
  }

  startTimer() {
    console.log('[bet-list] Countdown running...')
    this.timeToBetEnd = this.timeService.timeToBetEnd(this.currentRace)
    const intervalMs = 1000;
    const delay = 0;
    this.timer = timer(delay, intervalMs).subscribe(_ => {
      this.countdown = this.timeService.formatDuration(this.timeToBetEnd.subtract(intervalMs));
    });
  }

  async refresh(event?) : Promise<void> {
    console.log('[bet-list] Refreshing bet list...')
    this.resultService.getPoints(this.selectedRace.id).then(racePoints => {
      this.racePoints = racePoints;
    });
    if (event) event.target.complete();
  }

  async checkMissingBets() {
    const raceId = this.currentRace.id;
    const usersWithoutBet = await this.betService.getUsersWithoutBet(raceId);
    if (usersWithoutBet.length > 0) {
      this.alertService.confirm(`Deseja criar apostas para ${usersWithoutBet}?`, () => {
        console.log(`[bet-list] Resposta confirm: ok`);
        this.betService.createBets(usersWithoutBet, this.currentRace.season, this.currentRace.number - 1);
      });
    } else {
      this.alertService.alert('Nenhum usuário deixou de apostar!', 'Apostas');
    }
  }

  onRaceChanged() {
    console.log(`[bet-list] Race changed to: ${this.selectedRace.name}`);
    this.resultService.getPoints(this.selectedRace.id).then(racePoints => {
      this.racePoints = racePoints;
    });
  }

  onUserSelected(user: string) {
    if(this.selectedRace.number == 0) {
      return ['/tabs/bet/initial', user]
    }
    return ['/tabs/bet/bet-view', user, this.selectedRace.id]
  }
}
