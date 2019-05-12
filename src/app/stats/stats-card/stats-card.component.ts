import { Component, Input, OnInit } from '@angular/core';
import { DataPoint } from '../data-point';

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit {

  @Input() title: string;
  @Input() dataRows: Array<DataPoint>;

  constructor() { }

  ngOnInit() {
  }

}
