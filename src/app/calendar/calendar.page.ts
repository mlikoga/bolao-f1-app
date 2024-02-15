import { Component } from '@angular/core';
import { Race } from '../model/race';
import { AuthService } from '../services/auth.service';
import { RaceService } from '../services/race.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss']
})
export class CalendarPage {
  isAdmin: boolean;
  races: Array<Race>;
  currentRace: Race = Race.empty();

  constructor(
    private authService: AuthService,
    private raceService: RaceService,
    private timeService: TimeService) {
  }

  async ngOnInit() {
    this.authService.isAdmin().then(value => this.isAdmin = value);
    this.races = await this.raceService.getAllRaces();
    this.currentRace = this.timeService.currentRace(this.races);
    console.log(`[Calendar] Current race: ${this.currentRace.name}`);
  }
}
