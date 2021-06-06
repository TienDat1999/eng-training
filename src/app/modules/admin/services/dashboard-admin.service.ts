import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LoadOptions} from 'devextreme/data/load_options';

@Injectable()
export class DashboardAdminService {

  data = [
    {
      id: 1,
      code: '321231',
      name: 'abc',
      author: 'ec ec',
      type: 'admin',
    },
    {
      id: 2,
      code: '321231',
      name: 'abcewq',
      author: 'ec ec',
      type: 'admin',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
    {
      id: 3,
      code: '1313',
      name: 'dsa',
      author: 'ec ec',
      type: 'user',
    },
  ];
  constructor(private  http: HttpClient) { }

  getCoursers(loadOptions: LoadOptions): Observable<any>{
    return of(this.data);
  }
  getUsers(loadOptions: LoadOptions): Observable<any>{
    return of(this.data);
  }

  removeDate(row: any): Observable<any>{
    return of(true);
  }
}
