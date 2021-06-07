import {Component, OnInit} from '@angular/core';
import {WordLearnedService} from '@app/modules/user/services/word-learned.service';
import {WordModel} from '@app/modules/user/models/user.model';
import * as _ from 'lodash';
import {TranslateVnService} from '@app/modules/user/services/translate-vn.service';
import {TranslateOption} from '@app/modules/user/models/translate.option';
import {Router} from '@angular/router';
import {CrawWordModel} from '@app/modules/user/models/word.model';

@Component({
  selector: 'app-review-word',
  templateUrl: './review-word.component.html',
  styleUrls: ['./review-word.component.scss']
})
export class ReviewWordComponent implements OnInit {
  words: CrawWordModel[] = [];
  word: CrawWordModel;
  countDown = 5;
  answerCorrect = 0;
  totalNumberWord;
  interval: any;
  isOpenTopic = false;
  isOpenReview = true;
  currentIndex = 0;
  constructor(private wordReviewService: WordLearnedService, private router: Router) {
  }

  ngOnInit(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.onGetWords(course);
  }
  onGetWords(course): void{
    this.wordReviewService.getWordReview(course.course.id).subscribe(val => {
      if (!!val) {
        this.words = val;
        this.totalNumberWord = val.length;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.handleCountDownTimer();
      this.onProcessWord();
    });
  }
  handleCountDownTimer(): void {
    this.interval = setInterval(() => {
      this.countDown -= 1;
      if (this.countDown === 0) {
        this.currentIndex += 1;
        clearInterval(this.interval);
        this.onProcessWord();
        this.countDown = 5;
        this.handleCountDownTimer();
      }
    }, 1000);

    if (this.words.length === 0) {
      clearInterval(this.interval);
      this.countDown = 0;
      this.isOpenTopic = true;
    }
  }

  onProcessWord(): void {
    const indexWord = _.random(this.words.length - 1);
    this.word = this.words[indexWord];
    this.words.splice(indexWord, 1);
  }

  closeReview(): void {
    clearInterval(this.interval);
    const course = JSON.parse(localStorage.getItem('courseEng'));
    const param = course.course.courseName.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/course', param]);
  }

  callBackNextWordHandel(): void {
    clearInterval(this.interval);
    this.countDown = 5;
    this.currentIndex += 1;
    this.answerCorrect += 1;
    this.onProcessWord();
    this.handleCountDownTimer();
  }
}
