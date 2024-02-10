import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { InitialBet } from '../model/initial-bet';
import { Driver } from '../model/driver';
import { Team } from '../model/team';
import { AuthService } from '../services/auth.service';
import { InitialBetService } from '../services/initial-bet.service';
import { TimeService } from '../services/time.service';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-initial-bet',
  templateUrl: 'initial-bet.page.html',
  styleUrls: ['initial-bet.page.scss']
})
export class InitialBetPage {

  positions: Array<number> = [0, 1, 2, 3, 4];
  drivers: Array<Driver> = Driver.all();
  teams: Array<Team> = Team.all();
  db: firebase.firestore.Firestore;
  user: string;
  initialBet: InitialBet = new InitialBet();

  customAlertOptions: any = {
    backdropDismiss: true,
  };

  constructor(
      public alertController: AlertController,
      public loadingController: LoadingController,
      public toastController: ToastController,
      public authService: AuthService,
      public initialBetService: InitialBetService,
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
    this.initialBet = await this.initialBetService.getUserInitialBet(username) || new InitialBet();
    console.log("Initial bet: ", this.initialBet);
  }

  onPositionChanged(positionsArray: Array<string>, pos: number) {
    let bet = positionsArray[pos];
    console.log(`onPositionChanged: pos ${pos} -> ${bet}`);

    if (!bet) return;

    // Unique driver in each position
    let idx1 = positionsArray.indexOf(bet);
    let idx2 = positionsArray.lastIndexOf(bet);
    if (idx1 != idx2) {
      if (idx1 != pos) {
        positionsArray[idx1] = null;
      } else {
        positionsArray[idx2] = null;
      }
    }
  }

  canSubmit() {
    return !this.initialBet.driversPositions.includes(undefined) &&
           !this.initialBet.driversPositions.includes(null) &&
           !this.initialBet.teamsPositions.includes(undefined) &&
           !this.initialBet.teamsPositions.includes(null);
  }

  async onSubmitClicked() {
    console.log(`Drivers positions: ${this.initialBet.driversPositions}`);
    console.log(`Team positions: ${this.initialBet.teamsPositions}`);
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

    let season = this.timeService.currentSeason();
    let docId = `${season}.${username}`;
    console.log(`InitialBetId: ${docId}`);

    const loading = await this.loadingController.create({
      spinner: "circles",
      translucent: true,
    });
    loading.present();

    this.initialBetService.setUserInitialBet({
      ...this.initialBet,
      user: username,
      season: season,
    })
    .then(() => {
      console.log("Initial Bet registered!");
      this.toastController.create({
        message: "Aposta enviada com sucesso!",
        color: "success",
        position: "middle",
        duration: 5000,
      })
      .then(toast => toast.present())
      .then(() => this.router.navigate(['tabs']));
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
