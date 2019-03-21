import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Bet } from '../model/bet';
import { BetService } from '../services/bet.service';
import { ResultService } from '../services/result.service';
import { TimeService } from '../services/time.service';
import { PointCalculator } from '../points/point-calculator';
import { BetPoints } from '../model/betPoints';

@Component({
  selector: 'app-bet-view',
  templateUrl: './bet-view.page.html',
  styleUrls: ['./bet-view.page.scss'],
})
export class BetViewPage implements OnInit {
  bet$: Observable<Bet>;
  betPoints: BetPoints = new BetPoints();

  constructor(
    private route: ActivatedRoute,
    private betService: BetService,
    private resultService: ResultService,
    private timeService: TimeService
  ) {}

  ngOnInit() {
    this.bet$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.betService.getCurrentBet(params.get('username')))
    );
    let currentRace = this.timeService.currentRace();
    this.bet$.subscribe(
      bet => {
        this.resultService.getResult(currentRace).then(result => {
          if (result) {
            this.betPoints = PointCalculator.calculatePoints(result, bet);
          }
        })
      });
  }

}
