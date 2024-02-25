import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { Bet } from '../model/bet';
import { Driver } from '../model/driver';
import { Race } from '../model/race';
import { AuthService } from '../services/auth.service';
import { RaceService } from '../services/race.service';
import { TimeService } from '../services/time.service';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { BetService } from 'app/services/bet.service';
import { AlertService } from 'app/services/alert.service';

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
  race: Race = Race.empty();
  currentBet: Bet = Bet.empty();

  customAlertOptions: any = {
    backdropDismiss: true,
  };

  constructor(
      public loadingController: LoadingController,
      public toastController: ToastController,
      public alertService: AlertService,
      public authService: AuthService,
      public betService: BetService,
      public raceService: RaceService,
      public route: ActivatedRoute,
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
    this.route.params.subscribe(async params => {
      let raceId = params['raceid'];
      this.race = await this.raceService.getRace(raceId);
      let bet   = await this.betService.getUserBet(username, raceId);
      if (bet) {
        this.currentBet = bet;
        console.log("[BetPage] Bet found: ", this.currentBet);
      } else {
        // No current bet, try to get the last one
        let lastBet = await this.betService.getLastUserBet(username, this.race.season);
        console.log("[BetPage] Getting last bet: ", lastBet);
        if (lastBet) {
          this.currentBet = lastBet;
        }
      }
    });
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
  
  clearAllFields() {
    this.alertService.confirm("Limpar todos os campos?", "", () => {
      this.currentBet = Bet.empty();
    });
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

    // Ensure that bet is not submitted after the end of the allowed time
    if (this.timeService.timeToBetEnd(this.race).asSeconds() <= 0) {
      console.log("[BetPage] Betting time is over.");
      this.alertService.alert("Apostas encerradas", "O período de apostas encerrou para esta corrida.");
      return;
    }

    // Check if all fields are filled
    if(!this.canSubmit()) {
      this.alertService.alert("Aposta incompleta", "Preencha todos os campos.");
      return;
    }

    // Check login
    let username = await this.authService.getCurrentUsername();
    if (!username) {
      this.router.navigate(['login']);
      return;
    }

    let race = this.race.id;
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
      forgotten: false,
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
