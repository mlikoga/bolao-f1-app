import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    var config = {
      apiKey: "AIzaSyBHRH42XCQA7PArHGHT-kB5D6K6p7mbUlE",
      authDomain: "bolao-f1-2019.firebaseapp.com",
      databaseURL: "https://bolao-f1-2019.firebaseio.com",
      projectId: "bolao-f1-2019",
      storageBucket: "bolao-f1-2019.appspot.com",
      messagingSenderId: "639944233757"
    };
    firebase.initializeApp(config);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
