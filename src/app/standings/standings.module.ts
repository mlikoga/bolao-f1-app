import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StandingsPage } from './standings.page';
import { AbsPipe } from '../abs.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StandingsPage }])
  ],
  declarations: [StandingsPage, AbsPipe]
})
export class StandingsPageModule {}
