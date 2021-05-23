import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {CourseManagerComponent, UserManagerComponent} from '@app/modules/admin/components';

const COMPONENTS = [
  DashboardComponent,
  CourseManagerComponent,
  UserManagerComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: DashboardComponent,
        children: [
          {path: '', redirectTo: 'course', pathMatch: 'full'},
          {path: 'course', component: CourseManagerComponent},
          {path: 'user', component: UserManagerComponent},
        ]
      },
    ])
  ],
})
export class AdminModule {
}
