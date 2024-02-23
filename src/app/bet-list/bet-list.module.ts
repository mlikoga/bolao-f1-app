import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BetListPage } from './bet-list.page';
import { StatsPage } from 'app/stats/stats.page';
import { StatsCardComponent } from 'app/stats/stats-card/stats-card.component';


const routes: Routes = [
  {
    path: '',
    component: BetListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BetListPage, StatsPage, StatsCardComponent]
})
export class BetListPageModule {}
