import { AlertController } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) {
  }

  async confirm(header: string, message: string, okHandler) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        }, {
          text: 'OK',
          handler: okHandler,
        }
      ]
    });

    await alert.present();
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}