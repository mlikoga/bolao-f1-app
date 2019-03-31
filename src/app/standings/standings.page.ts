import { Component } from '@angular/core';
import { User } from '../model/user';
import { ResultService } from '../services/result.service';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage {

  db: firebase.firestore.Firestore;
  users: Array<User> = [];
  currentUser: string;

  constructor(private authService: AuthService, private resultService: ResultService) { 
    this.db = firebase.firestore();
  }
  
  ionViewWillEnter() {
  }
  
  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUser();
    this.refresh();
  }

  refresh(event?) : void {
    this.users = [];
    this.db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
          let user = doc.data() as User;
          user.points = await this.resultService.getTotalPoints(user.username);
          this.users.push(user);
          this.users.sort((u1, u2) => u2.points - u1.points);
          if (event) event.target.complete();
      });
    });
  }
}
