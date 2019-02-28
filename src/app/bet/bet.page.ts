import { Component } from '@angular/core';
import { Driver } from '../model/driver';

@Component({
  selector: 'app-bet',
  templateUrl: 'bet.page.html',
  styleUrls: ['bet.page.scss']
})
export class BetPage {

  positions: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  drivers: Array<Driver> = [];
  poleBet: number;
  betPositions: Array<number> = new Array(10);
  
  constructor() {
    this.drivers = [
      { id: 44, name: 'Lewis Hamilton' },
      { id: 77, name: 'Valtteri Bottas' },
      { id:  5, name: 'Sebstian Vettel' },
      { id: 16, name: 'Charles Leclerc' },
      { id: 35, name: 'Max Verstappen' },
      { id:  3, name: 'Daniel Ricciardo' },
      { id: 27, name: 'Nico Hulkenberg' },
      { id:  8, name: 'Romain Grosjean' },
      { id: 20, name: 'Kevin Magnussen' }
    ];
  }

  onPositionChanged(pos: number) {
    console.log(`onPositionChanged: ${pos}`);
  }

  onSubmitClicked() {
    console.log("Submeter aposta");
    console.log(`Pole: ${this.poleBet}`);
    console.log(this.betPositions);
  }
 }
