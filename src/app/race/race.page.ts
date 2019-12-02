import { Component } from '@angular/core';
import { Driver} from '../model/driver';
import { Race } from '../model/race';
import { Result } from '../model/result';
import { AuthService } from '../services/auth.service';
import { ResultService } from '../services/result.service';
import { TimeService } from '../services/time.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-race',
  templateUrl: 'race.page.html',
  styleUrls: ['race.page.scss']
})
export class RacePage {
  drivers: Array<Driver> = Driver.all();
  result: Result;
  driversOrdered: Array<Driver>;
  isAdmin: boolean;
  races: Array<Race> = Race.all();
  selectedRaceId: number = 1;

  constructor(
    private authService: AuthService,
    private resultService: ResultService,
    private timeService: TimeService,
    private toastController: ToastController) {
  }

  ngOnInit() {
    this.authService.isAdmin().then(value => this.isAdmin = value);
    let currentRace = this.timeService.currentRace();
    this.result = new Result(currentRace.id);
    this.selectedRaceId = currentRace.id;
    this.driversOrdered = Driver.all();
    console.log(`Current race: ${currentRace.name}`);
    this.onRaceChanged();
  }

  onRaceChanged() {
    console.log(`Race changed to: ${this.selectedRaceId}`);
    let selectedRace = Race.withId(this.selectedRaceId);
    this.resultService.getResult(selectedRace).then(res => {
      if (res) {
        this.result = res;
        this.driversOrdered = res.positions.map(id => Driver.fromId(id));
      }
    });
  }

  itemReorder(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);
    this.driversOrdered = ev.detail.complete(this.driversOrdered);
  }

  async uploadResult() {
    console.log('Uploading result...');
    console.log(this.result);
    this.result.positions = this.driversOrdered.map(driver => driver.id);
    let selectedRace = Race.withId(this.selectedRaceId);
    await this.resultService.setRaceResult(selectedRace, this.result);
    this.toastController.create({
      message: "Resultado enviado",
      color: "success",
      position: "middle",
      duration: 3000,
    }).then(toast => toast.present());
  }
}
