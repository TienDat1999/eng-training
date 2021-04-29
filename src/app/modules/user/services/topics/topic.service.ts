import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private  http: HttpClient ) { }
  getTopics(id): Observable<any>{
    if (environment.production){
      console.log('get topic');
    }
    return this.http.get(`${environment.apiUrl}/course/${id}/topic`);
  }
}
