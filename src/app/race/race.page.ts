import { Component } from '@angular/core';
import { Driver} from '../model/driver';
import { Race } from '../model/race';
import { Result } from '../model/result';
import { AuthService } from '../services/auth.service';
import { RaceService } from '../services/race.service';
import { ResultService } from '../services/result.service';
import { SeasonResultService } from '../services/seasonResult.service';
import { TimeService } from '../services/time.service';
import { ToastController } from '@ionic/angular';
import { SeasonResult } from 'app/model/seasonResult';
import { Team } from 'app/model/team';

@Component({
  selector: 'app-race',
  templateUrl: 'race.page.html',
  styleUrls: ['race.page.scss']
})
export class RacePage {
  drivers: Array<Driver> = Driver.all();
  result: Result = new Result("");
  seasonResult: SeasonResult = new SeasonResult(2024);
  driversOrdered: Array<Driver>;
  isAdmin: boolean;
  races: Array<Race>;
  selectedRace: Race;
  isSeason: boolean = false;
  teams: Array<Team> = Team.all();
  positions: Array<number> = [0, 1, 2, 3, 4];

  constructor(
    private authService: AuthService,
    private raceService: RaceService,
    private resultService: ResultService,
    private seasonResultService: SeasonResultService,
    private timeService: TimeService,
    private toastController: ToastController) {
  }

  async ngOnInit() {
    this.authService.isAdmin().then(value => this.isAdmin = value);
    this.races = await this.raceService.getAllRaces();
    let currentRace = this.timeService.currentRace(this.races);
    this.selectedRace = currentRace;
    console.log(`[Race Results] Current race: ${currentRace.name}`);

    this.result = new Result(currentRace.id);
    this.seasonResult = new SeasonResult(this.timeService.currentSeason());
    this.driversOrdered = Driver.all();
    
    this.onRaceChanged();
  }

  onRaceChanged() {
    console.log(`[Race Results] Race changed to: ${this.selectedRace.name}`);
    this.isSeason = this.selectedRace.number === 0;

    if(this.isSeason) {
      this.seasonResultService.getSeasonResult(this.selectedRace).then(res => {
        if (res) {
          this.seasonResult = res;
        }
      });
    } else {
      this.resultService.getResult(this.selectedRace).then(res => {
        if (res) {
          this.result = res;
          this.driversOrdered = res.positions.map(id => Driver.fromId(id));
        }
      });
    }
  }

  itemReorder(ev) {
    console.log(`Moving item from ${ev.detail.from} to ${ev.detail.to}`);
    this.driversOrdered = ev.detail.complete(this.driversOrdered);
  }

  async uploadResult() {
    this.result.positions = this.driversOrdered.map(driver => driver.id);
    if (this.isSeason) {
      console.log('Uploading season result...');
      console.log(this.seasonResult);
      await this.seasonResultService.setSeasonResult(this.selectedRace, this.seasonResult);
    } else {
      console.log('Uploading result...');
      console.log(this.result);
      await this.resultService.setRaceResult(this.selectedRace, this.result);
    }
    this.toastController.create({
      message: "Resultado enviado",
      color: "success",
      position: "middle",
      duration: 3000,
    }).then(toast => toast.present());
  }
}
