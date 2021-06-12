import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {CourseManagerComponent, UserManagerComponent, SidebarComponent, FooterComponent} from '@app/modules/admin/components';
import {DxDataGridModule} from 'devextreme-angular';
import {DashboardAdminService} from '@app/modules/admin/services';
import {CommonModule} from '@angular/common';

const COMPONENTS = [
  DashboardComponent,
  CourseManagerComponent,
  UserManagerComponent,
  SidebarComponent,
  FooterComponent,
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
    ]),
    DxDataGridModule,
    CommonModule,
  ],
  providers: [DashboardAdminService],
})
export class AdminModule {
}
