import { AlertController } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) {
  }

  async confirm(message: string, okHandler) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
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

  async alert(message: string, header: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}