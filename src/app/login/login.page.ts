import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { InitialBetService } from '../services/initial-bet.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string;
  password: string;

  constructor(
    private authService: AuthService,
    private initialBetService: InitialBetService,
    private router: Router,
    private toastController: ToastController,  
  ) {
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let authenticated = await this.authService.authenticated();
    console.log(`Usuário autenticado: ${authenticated}`);
    if(authenticated) {
      this.redirectUser();
    }
  }
  
  loginClicked() {
    this.authService.login(this.login, this.password)
      .then(() => {
        console.log('Login successful!');
        this.redirectUser();
      })
      .catch(error => {
        console.error(error);
        this.showErrorMessage(error.message);
      });
  }

  async redirectUser() {
    let username = await this.authService.getCurrentUsername();
    let hasInitialBet = await this.initialBetService.userHasInitialBet(username);
    if (hasInitialBet) {
      console.log('User has initial bet, redirecting to tabs...');
      this.router.navigate(['tabs']);
    } else {
      console.log('User does NOT have initial bet, redirecting to initial bet...');
      this.router.navigate(['tabs', 'bet', 'initial'])
    }
  }

  showErrorMessage(message: string) {
    this.toastController.create({
      message: message,
      color: "danger",
      position: "bottom",
      duration: 5000,
    }).then(toast => toast.present());
  }

}
