import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderServicesService {


  constructor() {
  }
  token(): any{
    const tokenSting =  localStorage.getItem('userEnglishTraining');
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${tokenSting}`)
    };
    return header;
  }
}
