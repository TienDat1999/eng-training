import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// used to create fake backend
import {fakeBackendProvider} from './modules/auth/helpers';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from '@app/modules/user/user.module';
import {JwtInterceptor, ErrorInterceptor} from './modules/auth/helpers';
import {AdminComponent} from './modules/admin/components/admin';
import {LoginComponent} from './modules/auth/components/login';
import { HeaderComponent } from './theme/layouts/header/header.component';

@NgModule({
  imports: [
    UserModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
  ],
  exports: [AppComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
