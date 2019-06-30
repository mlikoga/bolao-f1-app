import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BetService } from '../services/bet.service';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  version: string;
  isSuperAdmin: boolean;

  constructor(
    public authService: AuthService,
    private betService: BetService,
    private cache: CacheService,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private swUpdate: SwUpdate) {

    this.version = "1.16";
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
    this.username = await this.authService.getCurrentUser();
    this.isSuperAdmin = await this.authService.getCurrentUser() === 'Koga';
  }

  backup() {
    this.betService.backupBets();
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
      this.toastController.create({
        message: "Cache limpo",
        color: "success",
        position: "middle",
        duration: 3000,
      })
      .then(toast => toast.present());
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
