import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Bet } from '../model/bet';
import { BetService } from '../services/bet.service';

@Component({
  selector: 'app-bet-view',
  templateUrl: './bet-view.page.html',
  styleUrls: ['./bet-view.page.scss'],
})
export class BetViewPage implements OnInit {
  bet$: Observable<Bet>;
  username: string;

  constructor(
    private route: ActivatedRoute,
    private betService: BetService
  ) {}

  ngOnInit() {
    this.bet$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.username = params.get('username');
        return this.betService.getCurrentBet(this.username);
      }));
  }

}
