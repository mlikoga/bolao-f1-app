import { Component } from '@angular/core';
import { User } from '../model/user';
import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-standings',
  templateUrl: 'standings.page.html',
  styleUrls: ['standings.page.scss']
})
export class StandingsPage {

  db: firebase.firestore.Firestore;
  users: Array<User> = [];
  constructor() { 
    this.db = firebase.firestore();
    this.refresh();
  }

  ionViewWillEnter() {
    
  }

  refresh(event?) : void {
    this.users = [];
    this.db.collection("users").orderBy("username", "asc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.users.push(doc.data() as User);
          if (event) event.target.complete();
      });
    });
  }
}
