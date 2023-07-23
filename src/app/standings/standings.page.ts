import { Component } from '@angular/core';
import { User } from '../model/user';
import { ResultService } from '../services/result.service';
import { AuthService } from '../services/auth.service';
import { Race } from '../model/race';

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

  constructor(private authService: AuthService, private resultService: ResultService) {
    this.lastRace = new Race();
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
      this.lastRace = Race.withId(lastResult.race);
    }
    this.users = await this.resultService.getUserStandings();
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
