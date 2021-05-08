import {Component, OnInit, ViewChild} from '@angular/core';
import {WordLearnedService} from '@app/modules/user/services/word-learned.service';
import {WordModel} from '@app/modules/user/models/userModel';
import * as _ from 'lodash';
import {TranslateVnService} from '@app/modules/user/services/translate-vn.service';
import {TranslateOption} from '@app/modules/user/models/translateOption';

@Component({
  selector: 'app-review-word',
  templateUrl: './review-word.component.html',
  styleUrls: ['./review-word.component.scss']
})
export class ReviewWordComponent implements OnInit {
  data: TranslateOption;
  words: WordModel[] = [];
  wordIem: WordModel;
  randomWordList = [];
  constructor(private wordReviewService: WordLearnedService, private translateS: TranslateVnService) {
  }

  ngOnInit(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.wordReviewService.getWordReview(course.course.id).subscribe(val => {
      this.words = val;
    }, error => {
      console.log(error)
    }, () => {
      this.onProcessWord();
      this.initRandom();
    });
  }

  onProcessWord(): void {
    const indexWord = _.random(this.words.length - 1);
    this.wordIem = this.words[indexWord];
  }

  chooseWord($event: MouseEvent): void {
    // this.data = new TranslateOption({
    //   data: 'the method or possibility of getting near to a place or person',
    //   target: 'vi' ,
    //   source: 'en',
    // });
    this.translateS.translateWord(this.data).subscribe(val => {
      console.log(val);
    });
  }

  initRandom(): void {
    const randomWords = this.words.sort(() => Math.random() - Math.random()).slice(0, 4);
    const isExist  = randomWords.filter(item => item.wordEng !== this.wordIem.wordEng);
    if ( isExist.length === 4){
      const newRandom = [];
      newRandom.push(...isExist.slice(1, 4), this.wordIem);
      this.randomWordList = newRandom.sort(() => Math.random() - Math.random()).slice(0, 4);
    }else{
      const newRandom = [];
      newRandom.push(...isExist, this.wordIem);
      this.randomWordList = newRandom.sort(() => Math.random() - Math.random()).slice(0, 4);
    }
  }
}
