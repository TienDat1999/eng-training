import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/modules/auth/services';
import {Role, User} from '@app/modules/auth/models';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
  }

  get isAdmin(): any {
    return this.user && this.user.role === Role.Admin;
  }

  logout(): any {
    this.authenticationService.logout();
  }

}
