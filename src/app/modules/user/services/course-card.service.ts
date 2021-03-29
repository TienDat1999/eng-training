import { Injectable } from '@angular/core';
import {courseCardMock, topicMock, wordMock} from '../../../mock-data/course-card';
import {Observable, of, Subject} from 'rxjs';
import {SimpleCardModel, TopicModel, WordModel} from '../models/userModel';
import {environment} from '../../../../environments/environment';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseCardService {
  constructor() {
  }

  getCourseCard(): Observable<SimpleCardModel[]> {
    if (environment.production) {
      console.log('get CourseCard');
    }
    return of(courseCardMock(3)).pipe(delay(500));
  }
  getTopic(): Observable<TopicModel[]> {
    if (environment.production) {
      console.log('get topic');
    }
    return of(topicMock(40)).pipe(delay(500));
  }
  getWord(): Observable<WordModel[]>{
    if (environment.production) {
      console.log('get word');
    }
    return of(wordMock(15)).pipe(delay(500));
  }

}
