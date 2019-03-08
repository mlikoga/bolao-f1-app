import { Component } from '@angular/core';
import { Driver } from '../model/driver';
import * as firebase from 'firebase';
import 'firebase/firestore';
@Component({
  selector: 'app-bet',
  templateUrl: 'bet.page.html',
  styleUrls: ['bet.page.scss']
})
export class BetPage {

  positions: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  drivers: Array<Driver> = [];
  poleBet: number;
  betPositions: Array<number> = new Array(10);
  
  constructor() {
    var config = {
      apiKey: "AIzaSyBHRH42XCQA7PArHGHT-kB5D6K6p7mbUlE",
      authDomain: "bolao-f1-2019.firebaseapp.com",
      databaseURL: "https://bolao-f1-2019.firebaseio.com",
      projectId: "bolao-f1-2019",
      storageBucket: "bolao-f1-2019.appspot.com",
      messagingSenderId: "639944233757"
    };
    firebase.initializeApp(config);
    var db = firebase.firestore();
    db.collection("drivers").orderBy("pos").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          this.drivers.push(doc.data() as Driver);
      });
    });
  }

  onPositionChanged(pos: number) {
    let bet = this.betPositions[pos];
    console.log(`onPositionChanged: pos ${pos} -> ${bet}`);
    
    if (!bet) return;

    // Unique driver in each position
    let idx1 = this.betPositions.indexOf(bet);
    let idx2 = this.betPositions.lastIndexOf(bet);
    if (idx1 != idx2) {
      if (idx1 != pos) {
        this.betPositions[idx1] = null;
      } else {
        this.betPositions[idx2] = null;
      }
    }
  }

  onSubmitClicked() {
    console.log("Submeter aposta");
    console.log(`Pole: ${this.poleBet}`);
    console.log(this.betPositions);
  }
 }
