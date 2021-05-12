import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {AddTopicModel} from '@app/modules/user/models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private  http: HttpClient ) { }
  getTopics(id): Observable<any>{
    if (environment.production){
      console.log('get topic id');
    }
    return this.http.get(`${environment.apiUrl}/course/${id}/topic`);
  }
  addTopics(topic: AddTopicModel): Observable<any>{
    if (environment.production){
      console.log('add topic');
    }
    console.log('topic', topic);
    return this.http.post<AddTopicModel>(`${environment.apiUrl}/course/topic`, topic);
  }
  removeTopic(id): Observable <any>{
    if (environment.production){
      console.log('remove topic');
    }
    return  this.http.delete(`${environment.apiUrl}/course/topic?id=${id}`);
  }
}
