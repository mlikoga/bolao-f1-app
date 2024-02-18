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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-race-result',
  templateUrl: 'race-result.page.html',
  styleUrls: ['race-result.page.scss']
})
export class RaceResultPage {
  drivers: Array<Driver> = Driver.all();
  result: Result = new Result("");
  seasonResult: SeasonResult = new SeasonResult(2024);
  driversOrdered: Array<Driver>;
  isAdmin: boolean = false;
  selectedRace: Race = Race.empty();
  isSeason: boolean = false;
  teams: Array<Team> = Team.all();
  positions: Array<number> = [0, 1, 2, 3, 4];

  constructor(
    private authService: AuthService,
    private raceService: RaceService,
    private resultService: ResultService,
    private route: ActivatedRoute,
    private seasonResultService: SeasonResultService,
    private timeService: TimeService,
    private toastController: ToastController) {
  }

  async ngOnInit() {
    this.driversOrdered = Driver.all();
    this.authService.isAdmin().then(value => this.isAdmin = value);
    this.route.params.subscribe(async params => {
      let raceId = params['raceid'];
      this.selectedRace = await this.raceService.getRace(raceId);
      this.isSeason = this.selectedRace.number === 0;
      console.log(`[Race Results] Race: ${this.selectedRace.name}`);

      if(this.isSeason) {
        this.seasonResultService.getSeasonResult(this.selectedRace).then(res => {
          if (res) {
            this.seasonResult = res;
          } else {
            this.seasonResult = new SeasonResult(this.timeService.currentSeason());
          }
        });
      } else {
        this.resultService.getResult(this.selectedRace.id).then(res => {
          if (res) {
            this.result = res;
            this.driversOrdered = res.positions.map(id => Driver.fromId(id));
          } else {
            this.result = new Result(this.selectedRace.id);
          }
        });
      }
    });
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
