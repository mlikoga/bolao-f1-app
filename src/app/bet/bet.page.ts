import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Bet } from '../model/bet';
import { Driver } from '../model/driver';
import { Race } from '../model/race';
import { AuthService } from '../services/auth.service';
import { RaceService } from '../services/race.service';
import { TimeService } from '../services/time.service';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { BetService } from 'app/services/bet.service';

@Component({
  selector: 'app-bet',
  templateUrl: 'bet.page.html',
  styleUrls: ['bet.page.scss']
})
export class BetPage {

  positions: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  drivers: Array<Driver> = Driver.all();
  db: firebase.firestore.Firestore;
  user: string;
  currentRace: Race = Race.empty();
  currentBet: Bet = Bet.empty();

  customAlertOptions: any = {
    backdropDismiss: true,
  };

  constructor(
      public alertController: AlertController,
      public loadingController: LoadingController,
      public toastController: ToastController,
      public authService: AuthService,
      public betService: BetService,
      public raceService: RaceService,
      public router: Router,
      public timeService: TimeService) {

    this.db = firebase.firestore();
  }

  async ngOnInit() {
    let username = await this.authService.getCurrentUsername();
    if (!username) {
      this.router.navigate(['login']);
      return;
    }
    this.currentRace = this.timeService.currentRace(await this.raceService.getAllRaces());
    let bet = await this.betService.getUserBet(username, this.currentRace.id);
    if(bet) {
      this.currentBet = bet;
      console.log("[BetPage] Bet found: ", this.currentBet);
    }
  }

  onPositionChanged(pos: number) {
    let bet = this.currentBet.positions[pos];
    console.log(`onPositionChanged: pos ${pos} -> ${bet}`);

    if (!bet) return;

    // Unique driver in each position
    let idx1 = this.currentBet.positions.indexOf(bet);
    let idx2 = this.currentBet.positions.lastIndexOf(bet);
    if (idx1 != idx2) {
      if (idx1 != pos) {
        this.currentBet.positions[idx1] = null;
      } else {
        this.currentBet.positions[idx2] = null;
      }
    }
  }

  canSubmit() {
    return !!this.currentBet.pole &&
      !!this.currentBet.fastestLap &&
      !this.currentBet.positions.includes(undefined) &&
      !this.currentBet.positions.includes(null);
  }

  async onSubmitClicked() {
    console.log(`Pole: ${this.currentBet.pole}`);
    console.log(this.currentBet.positions);
    console.log(`Can submit: ${this.canSubmit()}`);

    // Check if all fields are filled
    if(!this.canSubmit()) {
      const alert = await this.alertController.create({
        message: "Preencha todos os campos.",
        buttons: ["OK"],
      });
      await alert.present();
      return;
    }

    // Check login
    let username = await this.authService.getCurrentUsername();
    if (!username) {
      this.router.navigate(['login']);
      return;
    }

    let race = this.currentRace.id;
    let docId = `${username}.${race}`;
    console.log(`BetId: ${docId}`);

    const loading = await this.loadingController.create({
      spinner: "circles",
      translucent: true,
    });
    loading.present();

    this.db.collection("bets").doc(docId).set({
      user: username,
      race: race,
      pole: this.currentBet.pole,
      qualifying2: this.currentBet.qualifying2,
      qualifying3: this.currentBet.qualifying3,
      fastestLap: this.currentBet.fastestLap,
      positions: this.currentBet.positions,
      createdAt: new Date(),
    }, { merge: true })
    .then(() => {
      console.log("Bet registered!");
      this.toastController.create({
        message: "Aposta enviada com sucesso!",
        color: "success",
        position: "middle",
        duration: 5000,
      })
      .then(toast => toast.present());
    })
    .catch(error => {
      console.error("Error on submitting bet: ", error);
      this.toastController.create({
        message: `Erro ao enviar aposta :( ${error}`,
        color: "danger",
        duration: 5000,
      })
      .then(toast => toast.present());
    })
    .finally(() => {
      loading.dismiss();
    });
  }
}
