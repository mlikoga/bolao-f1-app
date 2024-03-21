import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Race } from '../model/race';
import { AuthService } from 'app/services/auth.service';
import { RaceService } from 'app/services/race.service';
import { ResultService } from 'app/services/result.service';
import { TimeService } from 'app/services/time.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-race-view',
  templateUrl: 'race-view.page.html',
  styleUrls: ['race-view.page.scss']
})
export class RaceViewPage {
  PTBR_DAY_SHORT_NAMES: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', "Sáb"];

  currentPhase: string;
  isAdmin: boolean = false;
  hasResult: boolean = false;
  race: Race = Race.empty();
  resultLink: Array<string>;
  popupOpen: string = null;

  constructor(
    private authService: AuthService,
    private raceService: RaceService,
    private resultService: ResultService,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private toastController: ToastController) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      let raceId = params['raceid'];
      this.race = await this.raceService.getRace(raceId);
      this.resultLink = ['/tabs/calendar/race-result', this.race.id];
      console.log("[RaceView] Race: ", this.race);

      this.currentPhase = this.timeService.currentRacePhase(this.race, this.timeService.now());
      console.log("[RaceView] Current phase: ", this.currentPhase);
      
      let result = await this.resultService.getResult(this.race.id);
      this.hasResult = result !== null;
    });
    this.isAdmin = await this.authService.isAdmin();
  }

  saveRace() {
    this.raceService.saveRace(this.race);
    console.log("[RaceView] Race saved: ", this.race);

    this.toastController.create({
      message: "Dados aualizados",
      color: "success",
      position: "middle",
      duration: 3000,
    }).then(toast => toast.present());
  }

  formatDate(date: string): string {
    return moment(date).locale('pt-br').format("ddd DD/MM HH:mm");
  }

  openDatePicker(datePickerName: string) {
    this.popupOpen = datePickerName;
  }

  closeDatePicker() {
    this.popupOpen = null;
  }
}
