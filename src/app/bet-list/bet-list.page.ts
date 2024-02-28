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

  showBet: boolean = true;
  content: string = 'bets';

  races: Array<Race> = [];
  racePoints: Array<RacePoints> = []

  selectedRace: Race = Race.empty();
  currentRace: Race = Race.empty();
  currentSeason: number;
  bettingEnabled: boolean = true;
  isAdmin: boolean;
  timeToBetEnd: moment.Duration;
  countdown: string;
  timer: Subscription;
  username: string;
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
    this.username      = await this.authService.getCurrentUsername();
    this.isAdmin       = await this.authService.isSuperAdmin();
    this.currentSeason = this.timeService.currentSeason();
    let allRaces       = await this.raceService.getAllRaces(this.currentSeason);
    this.currentRace   = this.timeService.currentRace(allRaces);
    this.selectedRace  = this.currentRace;
    //this.races         = allRaces.filter(race => race.number <= this.currentRace.number);
    this.races         = allRaces;
    console.log(`[bet-list] Season ${this.currentSeason} | Current race: `, this.currentRace);

    this.ionViewDidEnter();
  }

  async ionViewDidEnter() {
    this.refresh();
    // If betting is enabled, start countdown
    if (this.currentRace.isBetOpen()) {
      this.startTimer();
    }
  }

  ionViewDidLeave() {
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
    if(!this.username || this.selectedRace.number < 0)
      return; // Page not initialized yet

    console.log('[bet-list] Refreshing bet list...')
    this.resultService.getPoints(this.selectedRace.id).then(racePoints => {
      this.racePoints = racePoints;
    });

    // Check if user has bet
    if (this.selectedRace.number == 0) {
      let bet = await this.initialBetService.getUserInitialBet(this.username);  
      this.userHasBet = bet != null;
    } else {
      let bet = await this.betService.getUserBet(this.username, this.selectedRace.id);
      this.userHasBet = bet != null;
    }
    console.log("[bet-list] User has bet: ", this.userHasBet);
    
    if (event) event.target.complete();
  }

  betLink(race: Race): string {
    if (race.number == 0) {
      return '/tabs/bet/initial';
    }
    return `/tabs/bet/bet/${race.id}`;
  }

  async checkMissingBets() {
    const raceId = this.currentRace.id;
    const usersWithoutBet = await this.betService.getUsersWithoutBet(raceId);
    if (usersWithoutBet.length > 0) {
      this.alertService.confirm(`Deseja criar apostas para ${usersWithoutBet}?`, "", () => {
        console.log(`[bet-list] Resposta confirm: ok`);
        this.betService.createBets(usersWithoutBet, this.currentRace.season, this.currentRace.number - 1);
      });
    } else {
      this.alertService.alert('Nenhum usuário deixou de apostar!', '');
    }
  }

  onRaceChanged() {
    this.showBet = this.selectedRace.isBetOpen(this.timeService.now());
    console.log(`[bet-list] Race changed to: ${this.selectedRace.name}; showBet: ${this.showBet}`);
    this.refresh();
  }

  onUserSelected(user: string) {
    if(this.selectedRace.number == 0) {
      return ['/tabs/bet/initial', user]
    }
    return ['/tabs/bet/bet-view', user, this.selectedRace.id]
  }

  selectContent(contentName: string) {
    this.content = contentName;
  }
}
