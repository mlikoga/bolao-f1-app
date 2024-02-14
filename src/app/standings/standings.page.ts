import { Component } from '@angular/core';
import { User } from '../model/user';
import { ResultService } from '../services/result.service';
import { AuthService } from '../services/auth.service';
import { Race } from '../model/race';
import { RaceService } from 'app/services/race.service';
import { TimeService } from 'app/services/time.service';

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage {

  users: Array<User> = [];
  currentUser: string;
  lastRace: Race;
  content: string = 'standings';

  constructor(
    private authService: AuthService, 
    private raceService: RaceService,
    private resultService: ResultService,
    private timeService: TimeService) {
    this.lastRace = Race.empty();
  }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUsername();
    this.refresh();
  }

  selectContent(contentName: string) {
    this.content = contentName;
  }

  async refresh(event?) : Promise<void> {
    let lastResult = await this.resultService.getLastResult();
    if (lastResult) {
      this.lastRace = await this.raceService.getRace(lastResult.race);
      console.log("[standings] Last race: ", this.lastRace);
    }
    this.users = await this.resultService.getUserStandings(this.timeService.currentSeason());
    if (event) event.target.complete();
  }

  diffClass(diff: number) {
    if (diff < 0) return "down";
    if (diff > 0) return "up";
    return "equal";
  }

  diffIcon(diff: number) {
    if (diff < 0) return "arrow-dropdown";
    if (diff > 0) return "arrow-dropup";
    return "remove";
  }
}
