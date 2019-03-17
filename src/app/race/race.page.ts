import { Component } from '@angular/core';
import { Driver} from '../model/driver';
import { Race } from '../model/race';
import { Result } from '../model/result';
import { AuthService } from '../services/auth.service';
import { ResultService } from '../services/result.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-race',
  templateUrl: 'race.page.html',
  styleUrls: ['race.page.scss']
})
export class RacePage {
  drivers: Array<Driver> = Driver.all();
  result: Result;
  positions: Array<Driver> = Driver.all();
  currentRace: Race;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private resultService: ResultService,
    private timeService: TimeService) {

    this.currentRace = timeService.currentRace();
    this.result = new Result(this.currentRace.id);
    this.positions = Driver.all();
    authService.isAdmin().then(value => this.isAdmin = value);
  }

  itemReorder(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);
    this.positions = ev.detail.complete(this.positions);
  }

  uploadResult() {
    console.log('Uploading result...');
    console.log(this.result);
    this.result.positions = this.positions.map(driver => driver.id);
    this.resultService.setRaceResult(this.currentRace, this.result);
  }
}
