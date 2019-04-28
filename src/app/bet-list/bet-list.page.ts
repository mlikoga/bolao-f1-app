import { Component, OnInit } from '@angular/core';
import { ResultService } from '../services/result.service';
import { TimeService } from '../services/time.service';
import { Race } from '../model/race';
import { RacePoints } from '../model/racePoints';
import { User } from '../model/user';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.page.html',
  styleUrls: ['./bet-list.page.scss'],
})
export class BetListPage implements OnInit {

  races: Array<Race> = [];
  racePoints: Array<RacePoints> = []

  selectedRaceId: number = 1;
  currentRaceId: number;
  bettingEnabled: boolean;

  constructor(private resultService: ResultService, private timeService : TimeService) { 
  }
  
  ngOnInit() {
    this.currentRaceId = this.timeService.currentRace().id;
    this.selectedRaceId = this.currentRaceId;
    this.races = Race.all().filter(race => race.id <= this.currentRaceId);
    this.resultService.getPoints(this.currentRaceId).then(racePoints => {
      this.racePoints = racePoints;
    });
  }

  ionViewWillEnter() {
    this.bettingEnabled = this.timeService.bettingEnabled();
  }

  onRaceChanged() {
    console.log(`Race changed to: ${this.selectedRaceId}`);
    this.resultService.getPoints(this.selectedRaceId).then(racePoints => {
      this.racePoints = racePoints;
    });
  }
}
