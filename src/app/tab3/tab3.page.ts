import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  users: Array<Object> = []
  
  constructor() {
    this.users = [
      { 'name': 'Koga', 'points': 300},
      { 'name': 'Possebon', 'points': 264},
    ];
  }
}
