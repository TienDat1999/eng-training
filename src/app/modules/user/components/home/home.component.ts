import { Component, OnInit } from '@angular/core';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {TranslateVnService} from "@app/modules/user/services/translate-vn.service";
import {TranslateOption} from "@app/modules/user/models/translateOption";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crawWord: CrawWordsService,  private translateS: TranslateVnService) {
  }
  defineVnm:string;
  wordList: CrawWordModel[] = [];
  FillList: any = [];
  newList: CrawWordModel[] = [];
  ngOnInit(): void {
  }

  getWord(): void {
    this.crawWord.getWords().subscribe(data => this.wordList = data,
      error => console.error('Observer got an error: ' + error),
      () => {
        console.log('get complete');
      //  console.log(this.wordList)
      });
  }
  fillWords(): void{
    let defineVnm = '';
    let i = 0;
    const iter = setInterval(() => {
      const data = new TranslateOption({
       data: this.wordList[i].define,
       target: 'vi' ,
       source: 'en',
     });
      this.translateS.translateWord(data).subscribe(val => {
       defineVnm = val;
     }, error => {}, () => {
         this.newList.push(new CrawWordModel({
          id: this.wordList[i].id,
          wordEng: this.wordList[i].wordEng,
          wordType: this.wordList[i].wordType,
          define: this.wordList[i].define,
          example:  this.wordList[i].example,
          ipa: this.wordList[i].ipa,
          audioUrl: this.wordList[i].audioUrl,
          defineVn: defineVnm,
        }));
     });
      i++;
      if (i >= 5 ){
        clearInterval(iter);
        console.log(this.newList);
      }
    }, 1000);
  }
  updateData(): void{
    const data = new TranslateOption({
      data: 'the method or possibility of getting near to a place or person',
      target: 'vi' ,
      source: 'en',
    });
    this.translateS.translateWord(data).subscribe(val => {
      console.log(val);
    });
    // console.log(this.newList);
    // this.crawWord.updateWord(this.newList).subscribe(value => console.log('done', value));
  }
}
