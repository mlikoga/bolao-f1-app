import { Component } from '@angular/core';
import { Race } from '../model/race';
import { AuthService } from '../services/auth.service';
import { RaceService } from '../services/race.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: 'race-view.page.html',
  styleUrls: ['race-view.page.scss']
})
export class RaceViewPage {
  isAdmin: boolean;
  race: Race = Race.empty();

  constructor(
    private authService: AuthService,
    private raceService: RaceService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      let raceId = params['raceid'];
      this.race = await this.raceService.getRace(raceId);
      console.log("[RaceView] Race: ", this.race);
    });
  }

  formatDate(date: Date): string {
    return moment(date).locale('pt-br').format("ddd DD/MM hh:mmA");
  }
}
