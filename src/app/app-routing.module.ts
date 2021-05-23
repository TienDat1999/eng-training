import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@app/modules/user/user.module').then( m => m.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('@app/modules/admin/admin.module').then( m => m.AdminModule),
    // component: AdminComponent,
    // canActivate: [AuthGuard],
    // data: { roles: [Role.Admin] }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
    // otherwise redirect to home
   // { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
