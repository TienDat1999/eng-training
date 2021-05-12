import {Component, OnInit} from '@angular/core';
import {WordLearnedService} from '@app/modules/user/services/word-learned.service';
import {WordModel} from '@app/modules/user/models/user.model';
import * as _ from 'lodash';
import {TranslateVnService} from '@app/modules/user/services/translate-vn.service';
import {TranslateOption} from '@app/modules/user/models/translate.option';
import {Router} from '@angular/router';

@Component({
  selector: 'app-review-word',
  templateUrl: './review-word.component.html',
  styleUrls: ['./review-word.component.scss']
})
export class ReviewWordComponent implements OnInit {
  data: TranslateOption;
  words: WordModel[] = [];
  listRandom = [];
  wordIem: WordModel;
  randomWordList = [];
  countDown = 100;
  answerCorrect = 0;
  totalNumberWord;
  interval: any;
  isOpenTopic = false;
  constructor(private wordReviewService: WordLearnedService, private router: Router) {
  }

  ngOnInit(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.wordReviewService.getWordReview(course.course.id).subscribe(val => {
      this.words = val.filter(elm => elm !== null);
      const newVal = val.filter(elm => elm !== null);
      this.listRandom = [...newVal];
      this.totalNumberWord = this.listRandom.length;
    }, error => {
      console.log(error);
    }, () => {
      this.onProcessWord();
      this.initRandom();
    });
  }
  handleCountDownTimer(): void{
    this.interval = setInterval(() => {
      this.countDown -= 2;
      if (this.countDown === 0){
        const index = this.words.findIndex(word => word.wordEng === this.wordIem.wordEng);
        this.words.splice(index, 1);
        clearInterval(this.interval);
        if (index !== -1){
        this.onProcessWord();
        this.initRandom();
        }
        this.countDown = 100;
      }
      if (this.countDown < 0){
        clearInterval(this.interval);
      }
    }, 100);

    if (this.words.length === 0){
      this.countDown = 0;
      this.isOpenTopic = true;
      clearInterval(this.interval);
    }
  }
  onProcessWord(): void {
    const indexWord = _.random(this.words.length - 1);
    this.wordIem = this.words[indexWord];
  }
  chooseWord(event): void {

    if (this.words.length > 0){
     // debugger
      const value = event.target.firstChild.data;
      if (value.trim() === this.wordIem.wordEng.trim()){
        this.handleCorrectAnswer(event, value, 'is-correct');
        this.answerCorrect += 1;
      }
      else {
        this.handleCorrectAnswer(event, value, 'incorrect');
      }
    }else{
      this.countDown = 0;
    }
  }
  handleCorrectAnswer(event, value, text: string): void{
    document.getElementById(event.target.id).classList.add(text);
    setTimeout(() => {
      document.getElementById(event.target.id).classList.remove(text);
      const index = this.words.findIndex(word => word.wordEng === value.trim());
      this.words.splice(index, 1);
      this.onProcessWord();
      this.initRandom();
      clearInterval(this.interval);
      this.countDown = 100;
    } , 500);
  }
  initRandom(): void {
    this.handleCountDownTimer();
    if (this.words.length <= 0){
     clearInterval(this.interval);
    }
    const randomWords = this.listRandom.sort(() => Math.random() - Math.random()).slice(0, 4);
    if (!!this.wordIem?.wordEng){
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
    }else{
      setInterval(this.interval);
    }
  }

  closeReview(): void {
    clearInterval(this.interval);
    const course = JSON.parse(localStorage.getItem('courseEng'));
    const param = course.course.courseName.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/course', param]);
  }
}
