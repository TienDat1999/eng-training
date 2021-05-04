import { Injectable } from '@angular/core';
import {topicMock, wordMock} from '../../../mock-data/course-card';
import {Observable, of, Subject} from 'rxjs';
import {CourseModel, TopicModel, WordModel} from '../models/userModel';
import {environment} from '../../../../environments/environment';
import {delay} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HeaderServicesService} from '@app/modules/user/services/header-services.service';

@Injectable({
  providedIn: 'root'
})
export class CourseCardService {
  receiveParamId$: Observable<any>;
  private getIdParam = new Subject<any>();
  constructor(private  http: HttpClient, private tokensService: HeaderServicesService) {
    this.receiveParamId$ = this.getIdParam.asObservable();
  }
  sendParmaId(param): void{
    this.getIdParam.next(param);
  }
  getCourseCard(): Observable<any> {
    if (environment.production) {
      console.log('get CourseCard');
    }
    return  this.http.get(`${environment.apiUrl}/api/Course/`, this.tokensService.token());
  }
  addSimpleWordCompleted(simpleWord): Observable<any>{
    if (environment.production) {
      console.log('add simple word');
    }
    console.log('add word learned ', simpleWord);
    return this.http.put(`${environment.apiUrl}/course/simple-word-learned`, simpleWord, this.tokensService.token());
  }

}
