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
    let bet = this.betPositions[pos];
    console.log(`onPositionChanged: pos ${pos} -> ${bet}`);
    
    if (!bet) return;

    // Unique driver in each position
    let idx1 = this.betPositions.indexOf(bet);
    let idx2 = this.betPositions.lastIndexOf(bet);
    if (idx1 != idx2) {
      if (idx1 != pos) {
        this.betPositions[idx1] = null;
      } else {
        this.betPositions[idx2] = null;
      }
    }
  }

  onSubmitClicked() {
    console.log("Submeter aposta");
    console.log(`Pole: ${this.poleBet}`);
    console.log(this.betPositions);
  }
 }
