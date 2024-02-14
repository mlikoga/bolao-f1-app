import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RacePoints } from 'app/model/racePoints';
import { ResultService } from '../services/result.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-user-points',
  templateUrl: './user-points.page.html',
  styleUrls: ['./user-points.page.scss'],
})
export class UserPointsPage implements OnInit {
  racePoints: Array<RacePoints> = []
  totalPoints: number = 0
  username: string;

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private timeService: TimeService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.username = params['username'];
      this.racePoints = await this.resultService.getPointsPerRace(this.username, this.timeService.currentSeason());
      console.log(this.racePoints);
      this.totalPoints = this.resultService.getTotalPoints(this.racePoints);
    });
  }

}
