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

  getData(loadOptions: LoadOptions): Observable<any>{debugger;
    return of(this.data);
  }
}
