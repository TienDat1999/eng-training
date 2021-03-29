import { Component} from '@angular/core';
import { AuthenticationService } from './modules/auth/services';
import { User, Role } from './modules/auth/models';
import {CourseCardService} from '@app/modules/user/services/course-card.service';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent   {
    user: User;
    courseParam: any;
    constructor(private authenticationService: AuthenticationService, private courseService: CourseCardService) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }
  get isAdmin(): any {
        return this.user && this.user.role === Role.Admin;
    }

  logout(): any {
        this.authenticationService.logout();
    }

}
