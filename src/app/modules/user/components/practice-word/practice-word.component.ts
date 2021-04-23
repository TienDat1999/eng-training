import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {WordModel} from '@app/modules/user/models/userModel';
import * as _ from 'lodash';
import {WordTopicsService} from '@app/modules/user/services/wordTopics/word-topics.service';

@Component({
  selector: 'app-practice-word',
  templateUrl: './practice-word.component.html',
  styleUrls: ['./practice-word.component.scss']
})
export class PracticeWordComponent implements OnInit {
  options = {
    defaultOption: 0,
    ChooseOption: 1,
    inputOption: 2,
  };
  pointTarget = 1000;
  currentScore = 0;
  repeatNumber = 1;
  progressNumber = 0;
  scoreTurn: number;
  option = 1;
  paramIdl: number;
  indexWord = 0;
  wordPractice: WordModel[] = [];
  wordItem: WordModel;
  wordRandom = [];
  // tslint:disable-next-line:max-line-length
  numberIncrease = 0;
  isCorrectChosen: boolean;
  constructor(private courserService: CourseCardService,  private wordsS: WordTopicsService) {
  }

  ngOnInit(): void {
    this.courserService.receiveParamId$.subscribe(value => {
      localStorage.setItem('paramTopicID', value);
      this.paramIdl = value;
    }, error => console.log(error), () => {
    });
    this.initWordItem();
  }
  initWordItem(): void{
    const id = localStorage.getItem('paramTopicID');
    const param = !!id ? id : this.paramIdl;
    this.wordsS.getWordList(param).subscribe(value =>  {
     // console.log('get', value)
      this.scoreTurn = 100 / (value.length * this.repeatNumber);
      this.wordPractice = value.map(item => {
        const newItem = new WordModel(
          {
          id: item.id,
          wordEng: item.wordEng,
          imgUrl: item.imgUrl,
          audioUrl: item.audioUrl,
          wordType: item.wordType,
          example: item.example,
          ipa: item.ipa,
          define: item.define,
          repeatNumber: 0,
        });
        return newItem;
      });
      value.forEach(item => this.wordRandom.push(item.wordEng));
      this.wordItem = new WordModel( {
        wordEng: value[0].wordEng,
        imgUrl: value[0].imgUrl,
        audioUrl: value[0].audioUrl,
        wordType: value[0].wordType,
        example: value[0].example,
        ipa: value[0].ipa,
        define: value[0].define,
        repeatNumber: 0,
      });
      console.log('value', this.wordItem);
    });
  }


  //  unique(arr): any {
  //   const newArr = [];
  //    // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < arr.length; i++) {
  //     if (newArr.indexOf(arr[i]) === -1) {
  //       newArr.push(arr[i]);
  //     }
  //   }
  //   return newArr;
  // }


  handleNextOption(): void {
    this.indexWord += 1;
    this.option = _.sample([1, 2]);
  }

  moveToDefaultOption(): void {
    this.option = 0;
  }

  callBackNextWordHandel(): void {
    if (this.progressNumber <= 100){
      this.progressNumber += this.scoreTurn;
    }
    this.option = _.sample([1, 2]);
    this.indexWord = _.random(this.wordPractice.length - 1);
    if (this.wordPractice[this.indexWord].repeatNumber < this.repeatNumber){
      const newRepeatNumber = this.wordPractice[this.indexWord].repeatNumber + 1;
      this.initWord(this.indexWord, newRepeatNumber);
      this.wordPractice[this.indexWord].repeatNumber = newRepeatNumber;
    }else{
      const newWords = this.wordPractice.filter(item => item.repeatNumber < this.repeatNumber);
      if (newWords.length === 0){
        console.log('complete');
      }else{
        const index = _.random(newWords.length - 1);
        const newRepeatNumber = newWords[index].repeatNumber + 1;
        const idWord = newWords[index].id;
        const findIndexId = this.wordPractice.findIndex(elm => elm.id === idWord);
        this.initWord(index, newRepeatNumber, newWords);
        this.wordPractice[findIndexId].repeatNumber = newRepeatNumber;
      }
    }
    }
  initWord(index, newRepeatNumber, newWordArr?): void{
    this.wordItem = new WordModel( {
      wordEng: newWordArr ? newWordArr[index].wordEng : this.wordPractice[index].wordEng,
      imgUrl: newWordArr ? newWordArr[index].imgUrl : this.wordPractice[index].imgUrl,
      audioUrl: newWordArr ? newWordArr[index].audioUrl : this.wordPractice[index].audioUrl,
      wordType: newWordArr ? newWordArr[index].wordType :  this.wordPractice[index].wordType,
      example: newWordArr ? newWordArr[index].example :  this.wordPractice[index].example,
      ipa: newWordArr ? newWordArr[index].ipa :  this.wordPractice[index].ipa,
      define: newWordArr ? newWordArr[index].define :  this.wordPractice[index].define,
      repeatNumber: newRepeatNumber,
  });
  //  console.log(this.wordItem);
  }

  handleIsCorrect(event): void {
    this.isCorrectChosen = event;
  }
}
