import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Bet } from '../model/bet';
import { Race } from '../model/race';
import { BetService } from '../services/bet.service';
import { ResultService } from '../services/result.service';
import { PointCalculator } from '../points/point-calculator';
import { BetPoints } from '../model/betPoints';

@Component({
  selector: 'app-bet-view',
  templateUrl: './bet-view.page.html',
  styleUrls: ['./bet-view.page.scss'],
})
export class BetViewPage implements OnInit {
  bet$: Observable<Bet>;
  betPoints: BetPoints = new BetPoints("", "");
  race: Race;
  pointsRef = PointCalculator.racePoints;

  constructor(
    private route: ActivatedRoute,
    private betService: BetService,
    private resultService: ResultService
  ) {}

  ngOnInit() {
    this.bet$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let username = params.get('username');
        let raceId = params.get('race');
        return this.betService.getUserBet(username, raceId);
      })
    );
    this.bet$.subscribe(
      bet => {
        this.resultService.getResult(bet.race).then(result => {
          console.log("[bet-view] Result: ", result);
          if (result) {
            this.betPoints = PointCalculator.calculatePoints(result, bet);
          }
        })
      });
  }

}
