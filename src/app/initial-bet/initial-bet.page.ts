import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { InitialBet } from '../model/initial-bet';
import { Driver } from '../model/driver';
import { Team } from '../model/team';
import { AuthService } from '../services/auth.service';
import { TimeService } from '../services/time.service';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-initial-bet',
  templateUrl: 'initial-bet.page.html',
  styleUrls: ['initial-bet.page.scss']
})
export class InitialBetPage {

  drivers: Array<Driver> = Driver.all();
  restDrivers: Array<Driver>;
  restTeams: Array<Team>;
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
    this.restDrivers = this.drivers.slice(6);
    this.restTeams = Team.all().slice(3);
  }

  canSubmit() {
    return !!this.initialBet.champion &&
      !!this.initialBet.bestRestDriver &&
      !!this.initialBet.bestRestTeam;
  }

  async onSubmitClicked() {
    console.log(`Champion: ${this.initialBet.champion}`);
    console.log(`Best of the Rest Driver: ${this.initialBet.bestRestDriver}`);
    console.log(`Best of the Rest Team: ${this.initialBet.bestRestTeam}`);
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

    this.db.collection("initialBets").doc(docId).set({
      user: username,
      champion: this.initialBet.champion,
      bestRestDriver: this.initialBet.bestRestDriver,
      bestRestTeam: this.initialBet.bestRestTeam,
      createdAt: new Date(),
    }, { merge: true })
    .then(() => {
      console.log("Initial Bet registered!");
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
