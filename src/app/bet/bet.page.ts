import { Component } from '@angular/core';
import { Driver } from '../model/driver';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
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
  betPole: number;
  betFastestLap: number;
  betPositions: Array<number>;
  db: firebase.firestore.Firestore;
  user: string;

  customAlertOptions: any = {
    backdropDismiss: true,
    translucent: true
  };
  
  constructor(
      public alertController: AlertController, 
      public loadingController: LoadingController,
      public toastController: ToastController,
      public authService: AuthService) {
    
    this.betPositions = new Array(this.positions.length);
    this.db = firebase.firestore();
    this.db.collection("drivers").orderBy("pos").get().then((querySnapshot) => {
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

  canSubmit() {
    return !!this.betPole && 
      !!this.betFastestLap &&
      !this.betPositions.includes(undefined);
  }

  async onSubmitClicked() {
    console.log(`Pole: ${this.betPole}`);
    console.log(this.betPositions);
    console.log(`Can submit: ${this.canSubmit()}`);

    if(!this.canSubmit()) {
      const alert = await this.alertController.create({
        message: "Preencha todos os campos.",
        buttons: ["OK"],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      spinner: "circles",
      translucent: true,
    });
    loading.present();

    let username = this.authService.currentUser();
    let race = 1;
    let docId = `${username}.${race}`;
    console.log(`BetId: ${docId}`);
    this.db.collection("bets").doc(docId).set({
      user: username,
      race: race,
      pole: this.betPole,
      fastestLap: this.betFastestLap,
      positions: this.betPositions,
      createdAt: new Date(),
    })
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
      this.toastController.create({message: `Erro ao enviar aposta :( ${error}`})
      .then(toast => toast.present());
    })
    .finally(() => {
      loading.dismiss();
    });
  }
 }
