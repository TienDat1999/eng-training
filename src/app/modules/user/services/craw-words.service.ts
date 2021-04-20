import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CrawWordModel} from '@app/modules/user/models/word.model';
@Injectable({
  providedIn: 'root'
})
export class CrawWordsService {

  constructor(private http: HttpClient) { }
  URL = 'https://localhost:44347';
  getWords(): Observable<any>{
    return this.http.get(`${this.URL}/CrwalWord`);
  }
  fillWord(word): Observable<any>{
   return  this.http.get(`https://dictionary-api-five.vercel.app/api/v1/entries/en/${word.wordEng}`).pipe(map(item => {
      return {
        id: word.id,
        wordEng: word.wordEng,
        audioUrl: item[0].phonetics[0].audio,
        wordType: item[0].type,
        // tslint:disable-next-line:max-line-length
        example: item[0].meanings[0].definitions[0].examples[0].length < 200 ?  item[0].meanings[0].definitions[0].examples[0] : null,
        ipa: item[0].phonetics[0].text,
        define: item[0].meanings[0].definitions[0].definition,
      };
    }));
  }
  updateWord(wordList): Observable<any>{
    return this.http.put('https://localhost:44347/Word', wordList);
  }
}
