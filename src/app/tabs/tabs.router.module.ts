import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'calendar',
        children: [
          {
            path: '',
            loadChildren: '../calendar/calendar.module#CalendarPageModule'
          },
          {
            path: 'race-view/:raceid',
            loadChildren: '../race-view/race-view.module#RaceViewPageModule'
          },
          {
            path: 'race-result/:raceid',
            loadChildren: '../race-result/race-result.module#RaceResultPageModule'
          },
        ]
      },
      {
        path: 'bet',
        children: [
          {
            path: '',
            loadChildren: '../bet-list/bet-list.module#BetListPageModule'
          },
          {
            path: 'initial',
            loadChildren: '../initial-bet/initial-bet.module#InitialBetPageModule'
          },
          {
            path: 'initial/:username',
            loadChildren: '../initial-bet-view/initial-bet-view.module#InitialBetViewPageModule'
          },
          {
            path: 'bet',
            loadChildren: '../bet/bet.module#BetPageModule'
          },
          {
            path: 'bet-view/:username/:race',
            loadChildren: '../bet-view/bet-view.module#BetViewPageModule'
          },
        ]
      },
      {
        path: 'standings',
        children: [
          {
            path: '',
            loadChildren: '../standings/standings.module#StandingsPageModule'
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'user-points/:username',
        loadChildren: '../user-points/user-points.module#UserPointsPageModule'
      },
      {
        path: '',
        redirectTo: '/tabs/bet',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/bet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
