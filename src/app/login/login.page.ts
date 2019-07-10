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

  ionViewWillEnter() {
    this.authService.authenticated().then(authenticated => {
      console.log(`Usuário autenticado: ${authenticated}`);
      if(authenticated) {
        this.router.navigate(['tabs'])
      }
    });
  }

  loginClicked() {
    this.authService.login(this.login, this.password)
      .then(() => {
        console.log('Login successful!');
        this.router.navigate(['tabs']);
      })
      .catch(error => {
        console.error(error);
        this.showErrorMessage(error.message);
      });
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
