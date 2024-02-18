import { Component } from '@angular/core';
import { Race } from '../model/race';
import { AuthService } from '../services/auth.service';
import { RaceService } from '../services/race.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ResultService } from 'app/services/result.service';

@Component({
  selector: 'app-race-view',
  templateUrl: 'race-view.page.html',
  styleUrls: ['race-view.page.scss']
})
export class RaceViewPage {
  isAdmin: boolean = false;
  hasResult: boolean = false;
  race: Race = Race.empty();
  resultLink: Array<string>;

  constructor(
    private authService: AuthService,
    private raceService: RaceService,
    private resultService: ResultService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      let raceId = params['raceid'];
      this.race = await this.raceService.getRace(raceId);
      this.resultLink = ['/tabs/calendar/race-result', this.race.id];
      console.log("[RaceView] Race: ", this.race);

      let result = await this.resultService.getResult(this.race.id);
      this.hasResult = result !== null;
    });
    this.isAdmin = await this.authService.isAdmin();
  }

  formatDate(date: Date): string {
    return moment(date).locale('pt-br').format("ddd DD/MM HH:mm");
  }
}
