import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
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
        path: 'stats',
        children: [
          {
            path: '',
            loadChildren: '../stats/stats.module#StatsPageModule'
          }
        ]
      },
      {
        path: 'race',
        children: [
          {
            path: '',
            loadChildren: '../race/race.module#RacePageModule'
          }
        ]
      },
      {
        path: 'standings',
        children: [
          {
            path: '',
            loadChildren: '../standings/standings.module#StandingsPageModule'
          }
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
