import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUsername: string;

  constructor(private storage: Storage) {
    this.storage.get('login').then(value => {
      this.currentUsername = value;
    });
  }

  login(username: string) : void {
    this.currentUsername = username;
    this.storage.set('login', username);
    console.log("Login successful!");
  }

  currentUser() : string {
    return this.currentUsername;
  }

  authenticated() : boolean {
    return !!this.currentUsername;
  }
}
