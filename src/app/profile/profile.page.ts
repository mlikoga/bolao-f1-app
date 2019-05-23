import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CacheService } from '../services/cache.service';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  version: string;

  constructor(public authService: AuthService, private cache: CacheService,
    public toastController: ToastController,
    private swUpdate: SwUpdate) {

    this.version = "1.14";
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.username = await this.authService.getCurrentUser();
  }

  checkUpdates() {
    console.log('Verificando atualizações...');
    this.swUpdate.checkForUpdate();
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
}
