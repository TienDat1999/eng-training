import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/components/admin';
import { LoginComponent } from './modules/auth/components/login';
import { AuthGuard } from './modules/auth/helpers';
import { Role } from './modules/auth/models';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@app/modules/user/user.module').then( m => m.UserModule),
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
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
