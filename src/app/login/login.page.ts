import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string;

  constructor(public authService: AuthService, private router: Router) {
    if (authService.authenticated()) {
      this.router.navigate(['tabs']);
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.authService.authenticated()) {
      this.router.navigate(['tabs']);
    }
  }

  loginClicked() {
    this.authService.login(this.login);
  }

}
