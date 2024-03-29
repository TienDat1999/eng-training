﻿import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// used to create fake backend
import {ErrorInterceptor, JwtInterceptor} from './modules/auth/helpers';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from '@app/modules/user/user.module';
import {LoginComponent} from './modules/auth/components/login';
import {DefaultLayoutComponent} from '@app/theme/layouts/default-layout/default-layout.component';
import {AdminModule} from '@app/modules/admin/admin.module';
@NgModule({
  imports: [
    UserModule,
    AdminModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultLayoutComponent,
  ],
  exports: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    //fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})

export class AppModule {
}
