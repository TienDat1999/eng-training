import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordTopicsService {

  constructor(private  http: HttpClient) { }

  getWordList(id): Observable<any>{
    if (environment.production){
       console.log('get word list');
    }
    return this.http.get(`${environment.apiUrl}/course/topic/${id}`);
  }

}
