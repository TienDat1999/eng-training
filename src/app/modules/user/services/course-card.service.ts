import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
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
  createCourseCard(course): Observable<any> {
    if (environment.production) {
      console.log('create CourseCard');
    }
    return  this.http.post(`${environment.apiUrl}/api/Course/`, course, this.tokensService.token());
  }
  deleteCourseCard(id: number): Observable<any> {
    if (environment.production) {
      console.log('create CourseCard');
    }
    return  this.http.delete(`${environment.apiUrl}/api/Course?id=${id}`);
  }
  updateCourseCard(course): Observable<any>{
    if (environment.production) {
      console.log('update CourseCard');
    }
    return  this.http.put(`${environment.apiUrl}/api/Course`, course);
  }
  getPublicCourseCard(): Observable<any> {
    if (environment.production) {
      console.log('get Public CourseCard');
    }
    return  this.http.get(`${environment.apiUrl}/api/Course/public-course`, this.tokensService.token());
  }
  addSimpleWordCompleted(simpleWord): Observable<any>{
    if (environment.production) {
      console.log('add simple word');
    }
    console.log('add word learned ', simpleWord);
    return this.http.put(`${environment.apiUrl}/course/simple-word-learned`, simpleWord, this.tokensService.token());
  }
}
