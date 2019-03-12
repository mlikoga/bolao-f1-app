import { Component } from '@angular/core';
import { Driver } from '../model/driver';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
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

  customAlertOptions: any = {
    backdropDismiss: true,
    translucent: true
  };
  
  constructor(public alertController: AlertController, public toastController: ToastController) {
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

    this.db.collection("bets").add({
      user: 1,
      race: 1,
      pole: this.betPole,
      fastestLap: this.betFastestLap,
      positions: this.betPositions,
    })
    .then(doc => { 
      console.log("Bet registered! Id: ", doc.id);
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
    });
  }
 }
