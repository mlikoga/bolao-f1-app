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
  currentRace: Race;
  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private resultService: ResultService,
    private timeService: TimeService,
    private toastController: ToastController) {
  }

  async ngOnInit() {
    this.authService.isAdmin().then(value => this.isAdmin = value);
    this.currentRace = this.timeService.currentRace();
    this.result = new Result(this.currentRace.id);
    this.driversOrdered = Driver.all();
    console.log(`Current race: ${this.currentRace.name}`);
    try {
      this.result = await this.resultService.getResult(this.currentRace);
      this.driversOrdered = this.result.positions.map(id => Driver.fromId(id));
    } catch(e) {
      console.log('Result not found');
    }
  }

  itemReorder(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);
    this.driversOrdered = ev.detail.complete(this.driversOrdered);
  }

  async uploadResult() {
    console.log('Uploading result...');
    console.log(this.result);
    this.result.positions = this.driversOrdered.map(driver => driver.id);
    await this.resultService.setRaceResult(this.currentRace, this.result);
    this.toastController.create({
      message: "Resultado enviado",
      color: "success",
      position: "middle",
      duration: 3000,
    }).then(toast => toast.present());
  }
}
