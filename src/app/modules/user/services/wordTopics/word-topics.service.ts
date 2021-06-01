import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordTopicsService {

  constructor(private  http: HttpClient) { }

  getWordList(courseId: number, topicId: number): Observable<any>{
    if (environment.production){
       console.log('get word list');
    }
    return this.http.get(`${environment.apiUrl}/api/Word?CourseId=${courseId}&TopicId=${topicId}`);
  }
  getWordRandom(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/word/random`);
  }
}
