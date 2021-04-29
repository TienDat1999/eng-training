import {Component} from '@angular/core';
import {AuthenticationService} from '@app/modules/auth/services';
import {User} from '@app/modules/auth/models';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent {
  isLogged: any;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.isLogged = x);
  }

}
