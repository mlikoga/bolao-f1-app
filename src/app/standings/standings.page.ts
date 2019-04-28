import { Component } from '@angular/core';
import { User } from '../model/user';
import { ResultService } from '../services/result.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage {

  users: Array<User> = [];
  currentUser: string;

  constructor(private authService: AuthService, private resultService: ResultService) { 
  }
  
  ionViewWillEnter() {
  }
  
  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser();
    this.refresh();
  }

  async refresh(event?) : Promise<void> {
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
