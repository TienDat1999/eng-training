import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoadOptions} from 'devextreme/data/load_options';
import {environment} from '@environments/environment';

@Injectable()
export class DashboardAdminService {

  constructor(private http: HttpClient) {
  }

  getCoursers(loadOptions: LoadOptions): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/admin/course`);
  }

  getUsers(loadOptions: LoadOptions): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/admin/user`);
  }

  removeDate(row: any): Observable<any> {
    return of(true);
  }
}
