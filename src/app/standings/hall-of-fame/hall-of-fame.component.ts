import { Component, OnInit } from '@angular/core';
import { SeasonStanding, UserNumber } from 'app/model/seasonStanding';
import { ResultService } from 'app/services/result.service';
import { TimeService } from 'app/services/time.service';

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})
export class HallOfFameComponent implements OnInit {

  seasonStandings: Array<SeasonStanding> = [];
  top1Winner: UserNumber = {user: '', number: 0};
  top2Winner: UserNumber = {user: '', number: 0};
  top3Winner: UserNumber = {user: '', number: 0};

  firstSeason = 2018;

  constructor(private resultService: ResultService, private timeService: TimeService) { }

  async ngOnInit() {
    const thisSeason = this.timeService.currentSeason();
    const seasons = Array.from({length: thisSeason - this.firstSeason + 1}, (v, k) => thisSeason - k);

    // exception for YuriBarb - merge his users
    const yuriUsers = ["Hoje não!!!", "Marea98", "YuriBarb"];

    const overallWinners = {};
    for (let season of seasons) {
      this.seasonStandings.push( await this.resultService.getSeasonStandings(season));
    }

    for (let seasonStanding of this.seasonStandings) {
      for (let victory of seasonStanding.victories) {
        let user = victory.user;
        if (yuriUsers.includes(user)) {
          user = "YuriBarb";
        }

        if (overallWinners[user]) {
          overallWinners[user] += victory.number;
        } else {
          overallWinners[user] = victory.number;
        }
      }
    }

    let sortedWinners = Object.entries(overallWinners).sort((a, b) => +b[1] - +a[1]);
    this.top1Winner = { user: sortedWinners[0][0], number: +sortedWinners[0][1] } as UserNumber;
    this.top2Winner = { user: sortedWinners[1][0], number: +sortedWinners[1][1] } as UserNumber;
    this.top3Winner = { user: sortedWinners[2][0], number: +sortedWinners[2][1] } as UserNumber;
  }

}
