import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from '@app/modules/auth/services';
import {SignalrService} from '@app/modules/user/services/signalr.service';

@Component({selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent implements OnDestroy{
  isLogged: any;
  constructor(private authenticationService: AuthenticationService, private signal: SignalrService) {
    this.authenticationService.user.subscribe((x) => {
      this.isLogged = x;
      if (!!x){
        setTimeout(() => {
          this.signal.startConnection();
        }, 1000);
     }
    });
  }
  ngOnDestroy(): void {
    this.signal.connection.off('userConnected');
    this.signal.stopConnection();
  }
}
