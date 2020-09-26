import { Component, OnInit } from '@angular/core';
import { RacePoints } from 'app/model/racePoints';
import { ResultService } from 'app/services/result.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.page.html',
  styleUrls: ['./winners.page.scss'],
})
export class WinnersPage implements OnInit {

  winners: Array<RacePoints> = [];

  constructor(private resultService: ResultService) { }

  async ngOnInit() {
    this.winners = await this.resultService.getRaceWinners();
  }

}
