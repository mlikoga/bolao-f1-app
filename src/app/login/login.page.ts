import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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

  redirectUser() {
    this.router.navigate(['tabs']);
  }

  resetPasswordClicked() {
    this.authService.sendResetPasswordEmail(this.login)
    .then(() => this.showSuccessMessage('E-mail de recuperação enviado'))
    .catch(error => {
      console.error(error);
      this.showErrorMessage(error.message);
    });
  }

  showSuccessMessage(message: string) {
    this.toastController.create({
      message: message,
      color: "success",
      position: "bottom",
      duration: 5000,
    })
    .then(toast => toast.present())
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
