import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {HeaderServicesService} from '@app/modules/user/services/header-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserCourseService {

  constructor(private  http: HttpClient,  private tokensService: HeaderServicesService) { }
  ChooseCourse(id: number): Observable<any>{
    if (environment.production){
      console.log('choose course');
    }
    return this.http.post(`${environment.apiUrl}/api/UserCourse?courseId=${id}`, id, this.tokensService.token());
  }
}
