import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  constructor(private http: HttpClient) { }
   // @ts-ignore
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    this.http.post('/api/v1/image-upload', formData);
  }
}
