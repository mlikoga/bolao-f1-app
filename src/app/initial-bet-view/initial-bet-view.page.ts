import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InitialBet } from '../model/initial-bet';
import { InitialBetService } from '../services/initial-bet.service';

@Component({
  selector: 'app-initial-bet-view',
  templateUrl: 'initial-bet-view.page.html',
  styleUrls: ['initial-bet-view.page.scss']
})
export class InitialBetViewPage {

  username: string;
  initialBet: InitialBet = new InitialBet();

  constructor(
      public initialBetService: InitialBetService,
      private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.username = params['username'];
      this.initialBet = await this.initialBetService.getUserInitialBet(this.username);
    });
  }
}
