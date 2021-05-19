import {Component} from '@angular/core';
import {AuthenticationService} from '@app/modules/auth/services';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent {
  isLogged: any;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.isLogged = x);
  }

}
