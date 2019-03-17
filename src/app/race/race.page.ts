import { Component } from '@angular/core';
import { Driver} from '../model/driver';
import { Race } from '../model/race';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-race',
  templateUrl: 'race.page.html',
  styleUrls: ['race.page.scss']
})
export class RacePage {
  drivers: Array<Driver> = Driver.all();
  positions: Array<Driver> = Driver.all();
  currentRace: Race;

  constructor(private timeService: TimeService) {
    this.currentRace = timeService.currentRace();
  }

  itemReorder(ev) {
    console.log(typeof ev);
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);
    this.positions = ev.detail.complete(this.positions);
  }
}
