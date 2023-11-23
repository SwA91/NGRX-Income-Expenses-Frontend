import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { RouterModule } from '@angular/router';

const routesDaughter = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [authGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesDaughter)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
