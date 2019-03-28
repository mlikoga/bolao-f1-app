import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CacheService } from '../services/cache.service';
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
    public toastController: ToastController) {
      
    this.version = "1.5";
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.username = await this.authService.getCurrentUser();
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
