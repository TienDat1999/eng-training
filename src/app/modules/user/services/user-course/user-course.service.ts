import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {HeaderServicesService} from '@app/modules/user/services/header-services.service';
import {UserClass} from '@app/modules/user/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class UserCourseService {

  constructor(private  http: HttpClient,  private tokensService: HeaderServicesService) { }
  chooseCourse(id: number): Observable<any>{
    if (environment.production){
      console.log('choose course');
    }
    return this.http.get(`${environment.apiUrl}/api/UserCourse?courseId=${id}`, this.tokensService.token());
  }
  addUserToClass(userClass: UserClass): Observable<any>{
    if (environment.production){
      console.log('add user to class');
    }
    return  this.http.post(`${environment.apiUrl}/api/UserCourse/class`, userClass);
  }
  removeUserFromClass(userId: string, courseId: number): Observable<any>{
    if (environment.production){
      console.log('remove user from class');
    }
    return  this.http.delete(`${environment.apiUrl}/api/UserCourse/?userId=${userId}&courseId=${courseId}`);
  }
  getUserClass(idCourse: number): Observable<any>{
    if (environment.production){
      console.log('choose course');
    }
    return this.http.get(`${environment.apiUrl}/api/UserCourse/member?courseId=${idCourse}`);
  }
}
