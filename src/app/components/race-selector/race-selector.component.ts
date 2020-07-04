import { Component, OnInit } from '@angular/core';
import { Race } from 'app/model/race';
import { TimeService } from 'app/services/time.service';

@Component({
  selector: 'app-race-selector',
  templateUrl: './race-selector.component.html',
  styleUrls: ['./race-selector.component.scss']
})
export class RaceSelectorComponent implements OnInit {

  races: Array<Race> = [];
  selectedRaceId: number = 1;
  currentRaceId: number;

  constructor(private timeService : TimeService) {

  }

  ngOnInit() {
    this.currentRaceId = this.timeService.currentRace().id;
    this.selectedRaceId = this.currentRaceId;
    this.races = Race.all().filter(race => race.id <= this.currentRaceId);
  }

}
