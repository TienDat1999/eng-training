import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {TranslateOption} from '@app/modules/user/models/translateOption';

@Injectable({
  providedIn: 'root'
})
export class TranslateVnService {

  URL = 'https://google-translate1.p.rapidapi.com/language/translate/v2'; // endpoint cua ben radpi, dang xai google api
  // https://translation.googleapis.com/language/translate/v2 // Endpoint cua google

  get headers(): HttpHeaders {
    // const tokenSting =  localStorage.getItem('userEnglishTraining');
    return new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'application/gzip',
      'x-rapidapi-key': 'ae22054922msh748ac9534ec83ebp1d8986jsnc0a44382c0db',
      'x-rapidapi-host': 'google-translate1.p.rapidapi.com'
    });
  }

  constructor(private  http: HttpClient) {
  }

  translateWord(data: TranslateOption): Observable<any> {
    if (environment.production) {
      console.log('post translate');
    }
    return this.http.post(this.URL, `q=${data.data}&target=${data.target}&source=${data.source}`, { headers: this.headers});
  }
}
