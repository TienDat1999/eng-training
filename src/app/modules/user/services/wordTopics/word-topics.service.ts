import { Injectable } from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WordTopicsService {

  constructor(private  http: HttpClient) { }

  getWordList(id): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/learn/${id}`);
  }
}
