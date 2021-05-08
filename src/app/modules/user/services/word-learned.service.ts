import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HeaderServicesService} from '@app/modules/user/services/header-services.service';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WordLearnedService {

  constructor(private  http: HttpClient, private tokensService: HeaderServicesService) { }

  getWordReview(id): Observable<any> {
    if (environment.production) {
      console.log('get CourseCard');
    }
    return  this.http.get(`${environment.apiUrl}/api/WordLearned?courseId=${id}`, this.tokensService.token());
  }
}
