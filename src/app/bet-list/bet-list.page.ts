import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';
import { Race } from '../model/race';
import { User } from '../model/user';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.page.html',
  styleUrls: ['./bet-list.page.scss'],
})
export class BetListPage implements OnInit {

  db: firebase.firestore.Firestore;
  users: Array<User> = [];
  races: Array<Race> = Race.all();
  raceSelected: number = 1;

  constructor(private timeService : TimeService, private router: Router) { 
    this.db = firebase.firestore();
    this.db.collection("users").orderBy("username").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.users.push(doc.data() as User);
      });
    });
  }

  ngOnInit() {
    this.raceSelected = this.timeService.currentRace().id;
  }

  ionViewWillEnter() {
    if (this.timeService.bettingEnabled()) {
      this.router.navigate(['tabs/bet']);
    }
  }
}
