import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private  http: HttpClient) {
  }


  getRankingMember(): Observable<any> {
    if (environment.production) {
      console.log('get rank member');
    }
    return this.http.get(`${environment.apiUrl}/api/room/rank`);
  }
}
