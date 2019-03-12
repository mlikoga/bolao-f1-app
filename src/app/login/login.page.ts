import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: string;

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  loginClicked() {
    this.storage.set('login', this.login);
    console.log("Login successful!");
  }

}
