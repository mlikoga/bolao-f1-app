import { Component } from '@angular/core';
import { User } from '../model/user';
import { ResultService } from '../services/result.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage {

  users: Array<User> = [];
  currentUser: string;

  constructor(private authService: AuthService, private resultService: ResultService,
    private userService: UserService) { 
  }
  
  ionViewWillEnter() {
  }
  
  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser();
    this.refresh();
  }

  async refresh(event?) : Promise<void> {
    this.users = await this.userService.getUsers();
    this.users.forEach(async (user) => {
        user.points = await this.resultService.getTotalPoints(user.username);
    });
    this.users.sort((u1, u2) => u2.points - u1.points);
    if (event) event.target.complete();
  }
}
