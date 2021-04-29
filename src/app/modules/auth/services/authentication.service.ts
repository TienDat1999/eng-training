import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userEnglishTraining')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string): any {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
            .pipe(map(user => {
              if (user.result){
                localStorage.setItem('userEnglishTraining', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
              }
              return  user;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }));
    }

    logout(): any {
        // remove user from local storage to log user out
        localStorage.removeItem('userEnglishTraining');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}
