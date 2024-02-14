import { Component, OnInit } from '@angular/core';
import { RacePoints } from 'app/model/racePoints';
import { ResultService } from 'app/services/result.service';
import { TimeService } from 'app/services/time.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: Array<RacePoints> = [];

  constructor(private resultService: ResultService, private timeService: TimeService) { }

  async ngOnInit() {
    this.winners = await this.resultService.getRaceWinners(this.timeService.currentSeason());
  }

}
