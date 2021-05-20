import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private  http: HttpClient ) { }

  getWordCompetition(idCourse): Observable<any>{
    if (environment.production){
      console.log('get wordCompetition');
    }
    return this.http.get(`${environment.apiUrl}/api/Competition?courseId=${idCourse}`);
  }
}
