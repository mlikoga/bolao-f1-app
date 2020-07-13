import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InitialBet } from '../model/initial-bet';
import { Driver } from '../model/driver';
import { AuthService } from '../services/auth.service';
import { InitialBetService } from '../services/initial-bet.service';
import { TimeService } from '../services/time.service';

import * as firebase from 'firebase';
import 'firebase/firestore';

@Component({
  selector: 'app-initial-bet-view',
  templateUrl: 'initial-bet-view.page.html',
  styleUrls: ['initial-bet-view.page.scss']
})
export class InitialBetViewPage {

  db: firebase.firestore.Firestore;
  username: string;
  initialBet: InitialBet = new InitialBet();

  constructor(
      public initialBetService: InitialBetService,
      private route: ActivatedRoute) {

    this.db = firebase.firestore();
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.username = params['username'];
      this.initialBet = await this.initialBetService.getUserInitialBet(this.username);
    });
  }
}
