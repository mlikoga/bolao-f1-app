import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BetService } from '../services/bet.service';
import { CacheService } from '../services/cache.service';
import { RaceService } from '../services/race.service';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { User } from '../model/user';
import { TimeService } from 'app/services/time.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;
  version: string;
  isSuperAdmin: boolean;
  isUsernameEditable: boolean = false;

  constructor(
    private authService: AuthService,
    private betService: BetService,
    private cache: CacheService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private raceService: RaceService,
    private timeService: TimeService,
    private toastController: ToastController,
    private swUpdate: SwUpdate) {

    this.version = "7.1.0";
    this.user = new User('','');
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        console.log('Nova versão!');
        if (confirm('Nova versão disponível. Deseja atualizar?')) {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        }
      });
      this.swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
    }
  }

  async ionViewWillEnter() {
    this.user = await this.authService.getCurrentUser();
    this.isSuperAdmin = await this.authService.isSuperAdmin();
    let allRaces = await this.raceService.getAllRaces();
    this.isUsernameEditable = this.timeService.currentRace(allRaces).number === 0;
  }

  backup() {
    this.betService.backupBets();
  }

  changePassword() {
    this.presentPasswordPrompt();
  }

  async checkUpdates() {
    console.log('Verificando atualizações...');
    const loading = await this.loadingController.create({
      spinner: "circles",
      translucent: true,
    });
    loading.present();
    try {
      await this.swUpdate.checkForUpdate();
    } finally {
      loading.dismiss();
    }
  }

  clearCache() {
    this.cache.clear().then(() => {
      this.presentToastSuccess('Cache limpo');
    });
  }

  async editUsername() {
    await this.presentUsernamePrompt();
  }

  async duplicateRace() {
    await this.presentDuplicateRacePrompt();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['login']);
  }

  private async presentUsernamePrompt() {
    const alert = await this.alertController.create({
      header: 'Nome',
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: this.user.username,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (inputs) => {
            const username = inputs.username;
            console.log(`Confirm Ok ${username}`);
            if (username && username !== '') {
              this.authService.updateUsername(username);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentDuplicateRacePrompt() {
    const alert = await this.alertController.create({
      header: 'Nome',
      inputs: [
        {
          name: 'srcRace',
          type: 'text',
        },
        {
          name: 'dstRace',
          type: 'text',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (inputs) => {
            const srcRace = inputs.srcRace;
            const dstRace = inputs.dstRace;
            console.log(`Duplicating race ${srcRace} into ${dstRace}`);
            this.raceService.copyRace(srcRace, dstRace);
          }
        }
      ]
    });

    await alert.present();
  }

  private async presentPasswordPrompt() {
    const alert = await this.alertController.create({
      header: 'Senha',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Digite a senha atual',
        },
        {
          name: 'newPassword1',
          type: 'password',
          placeholder: 'Digite a nova senha',
        },
        {
          name: 'newPassword2',
          type: 'password',
          placeholder: 'Confirme a nova senha',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (inputs) => {
            const password: string = inputs.password;
            const newPwd1: string  = inputs.newPassword1;
            const newPwd2: string  = inputs.newPassword2;
            if (newPwd1 && newPwd1.length > 3 && newPwd1 === newPwd2) {
              this.authService.updatePassword(password, newPwd1)
                .then(() => this.presentToastSuccess('Senha alterada com sucesso'))
                .catch((error) => this.presentToastError(error));
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private presentToastSuccess(message: string) {
    this.toastController.create({
      message,
      color: "success",
      position: "middle",
      duration: 3000,
    })
    .then(toast => toast.present());
  }

  private presentToastError(message: string) {
    this.toastController.create({
      message,
      color: "error",
      position: "middle",
      duration: 3000,
    })
    .then(toast => toast.present());
  }
}
