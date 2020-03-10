import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  db: firebase.firestore.Firestore;
  firebaseUser: firebase.User;
  currentUser: User;

  constructor(private storage: Storage) {
    this.db = firebase.firestore();
  }

  getCurrentUser(): Promise<User> {
    if (this.currentUser) {
      return Promise.resolve(this.currentUser);
    }
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            console.log('User is signed in');
            console.log(user);
            this.firebaseUser = user;
            this.currentUser = new User(user.displayName, user.email);
            resolve(this.currentUser);
          } else {
            console.log('No user is signed in');
            resolve(null);
          }
        });
      } catch {
        reject('api failed');
      }
    });
  }

  async getCurrentUsername(): Promise<string> {
    const user = await this.getCurrentUser();
    return user ? user.username : 'No user';
  }

  login(email: string, password: string)  {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  logout() : Promise<void> {
    console.log("Logout");
    this.currentUser = null;
    return firebase.auth().signOut();
  }

  async isAdmin() : Promise<boolean> {
    const currentUser = await this.getCurrentUser();
    return currentUser && ['mlikoga@gmail.com', 'bruno.matsumoto@gmail.com', 'possebon.ro@gmail.com'].includes(currentUser.email);
  }

  async isSuperAdmin(): Promise<boolean> {
    const currentUser = await this.getCurrentUser();
    return currentUser && currentUser.username === 'Koga';
  }

  async authenticated() : Promise<boolean> {
    const currentUser = await this.getCurrentUser();
    return !!currentUser;
  }

  sendResetPasswordEmail(email: string) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  updateUsername(username: string) {
    this.firebaseUser.updateProfile({
      displayName: username,
    }).then(() => {
      this.currentUser.username = username;
    });
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.login(this.firebaseUser.email, currentPassword);
    return this.firebaseUser.updatePassword(newPassword);
  }
}
