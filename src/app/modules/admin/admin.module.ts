import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';


const COMPONENTS = [DashboardComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '', redirectTo: 'admin', pathMatch: 'full',
          },
        ]
      },
    ])
  ],
})
export class AdminModule {
}
