import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SwUpdate } from '@angular/service-worker';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
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

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      console.log('Verificando atualizações...');
      this.swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        console.log('Nova versão!');
        if (confirm('Nova versão disponível. Deseja atualizar?')) {
          this.swUpdate.activateUpdate().then(() => document.location.reload());
        }
      });
      this.swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
