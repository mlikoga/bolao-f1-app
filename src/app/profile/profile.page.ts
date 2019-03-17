import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;
  version: string;

  constructor(public authService: AuthService) {
    this.version = "1.3";
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.username = await this.authService.getCurrentUser();
  }

}
