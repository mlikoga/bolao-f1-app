import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  db: firebase.firestore.Firestore;
  currentUsername: string;

  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.storage.get('login').then(value => {
        this.currentUsername = value;
      })
    });
    this.db = firebase.firestore();
  }

  login(username: string) : void {
    this.currentUsername = username;
    this.storage.set('login', username);
    this.db.collection('users').doc(username).set({
      username: username,
      last_logged_in: new Date(),
    });
    console.log("Login successful!");
  }
  
  logout() : void {
    this.currentUsername = null;
    this.storage.set('login', null);
    console.log("Logout");
  }

  currentUser() : string {
    return this.currentUsername;
  }

  authenticated() : boolean {
    return !!this.currentUsername;
  }
}
