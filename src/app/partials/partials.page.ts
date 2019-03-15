import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';
import { Race } from '../model/race';
import { User } from '../model/user';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-partials',
  templateUrl: './partials.page.html',
  styleUrls: ['./partials.page.scss'],
})
export class PartialsPage implements OnInit {

  db: firebase.firestore.Firestore;
  users: Array<User> = [];
  currentRace: Race;

  constructor(private timeService : TimeService, private router: Router) { 
    this.db = firebase.firestore();
    this.db.collection("users").orderBy("username").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.users.push(doc.data() as User);
      });
    });
    this.currentRace = timeService.currentRace();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.timeService.bettingEnabled()) {
      this.router.navigate(['tabs/bet']);
    }
  }

  userClicked(user) {
    console.log(user);
  }

}
