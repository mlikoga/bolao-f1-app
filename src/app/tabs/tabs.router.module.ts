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
            loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule)
          },
          {
            path: 'race-view/:raceid',
            loadChildren: () => import('../race-view/race-view.module').then(m => m.RaceViewPageModule)
          },
          {
            path: 'race-result/:raceid',
            loadChildren: () => import('../race-result/race-result.module').then(m => m.RaceResultPageModule)
          },
        ]
      },
      {
        path: 'bet',
        children: [
          {
            path: '',
            loadChildren: () => import('../bet-list/bet-list.module').then(m => m.BetListPageModule)
          },
          {
            path: 'initial',
            loadChildren: () => import('../initial-bet/initial-bet.module').then(m => m.InitialBetPageModule)
          },
          {
            path: 'initial/:username',
            loadChildren: () => import('../initial-bet-view/initial-bet-view.module').then(m => m.InitialBetViewPageModule)
          },
          {
            path: 'bet/:raceid',
            loadChildren: () => import('../bet/bet.module').then(m => m.BetPageModule)
          },
          {
            path: 'bet-view/:username/:race',
            loadChildren: () => import('../bet-view/bet-view.module').then(m => m.BetViewPageModule)
          },
        ]
      },
      {
        path: 'standings',
        children: [
          {
            path: '',
            loadChildren: () => import('../standings/standings.module').then(m => m.StandingsPageModule)
          },
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'user-points/:username',
        loadChildren: () => import('../user-points/user-points.module').then(m => m.UserPointsPageModule)
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
