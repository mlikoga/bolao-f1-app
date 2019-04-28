import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  db: firebase.firestore.Firestore;

  constructor(private storage: Storage) {
    this.db = firebase.firestore();
  }

  async getCurrentUser(): Promise<string> {
    return this.storage.get('login');
  }

  login(username: string) : void {
    this.storage.set('login', username);
    this.db.collection('users').doc(username).set({
      username: username,
      last_logged_in: new Date(),
    });
    console.log("Login successful!");
  }

  logout() : void {
    this.storage.set('login', null);
    console.log("Logout");
  }

  async isAdmin() : Promise<boolean> {
    let username = await this.getCurrentUser();
    console.log(`current user: ${username}`);
    return ['Koga', 'mat', 'Possenbon'].includes(username);
  }

  async authenticated() : Promise<boolean> {
    let username = await this.getCurrentUser();
    return !!username;
  }
}
