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
      { 'name': 'Matsumoto', 'points': 209},
      { 'name': 'Bruno Maranhão', 'points': 208},
      { 'name': 'César Castro', 'points': 200},
      { 'name': 'Yuri', 'points': 197},
      { 'name': 'Jonathan Almeida', 'points': 190},
      { 'name': 'Renato Martella', 'points': 183},
      { 'name': 'Danilo Mayer', 'points': 182},
      { 'name': 'Luiz Maciel', 'points': 180},
      { 'name': 'PC', 'points': 176},
      { 'name': 'Bigas', 'points': 170},
    ];
  }
}
