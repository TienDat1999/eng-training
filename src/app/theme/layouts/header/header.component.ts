import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '@app/modules/auth/services';
import {Role, User} from '@app/modules/auth/models';
import {CourseCardService} from '@app/modules/user/services/course-card.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  courseParam: any;
  constructor(private authenticationService: AuthenticationService, private courseService: CourseCardService) {
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
