import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username: string;

  constructor(public authService: AuthService) { 
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.username = this.authService.currentUser();
  }

}
