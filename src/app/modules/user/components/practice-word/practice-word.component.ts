import {Component, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {OptionWordModel, WordModel} from '@app/modules/user/models/userModel';
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
  option = 1;
  paramIdl: number;
  indexWord = 0;
  wordPractice: WordModel[] = [];
  wordItem: OptionWordModel;
  wordRandom = [];
  // tslint:disable-next-line:max-line-length
 // wordSimple: { imgUrl: string; optionType: number[]; wordRandom: string[]; optionChoose: number; wordType: number; id: number; wordEng: string; soundUrl: string; example: string; status: boolean } = new TypeWordModel();
  isTrue = false;
  increaseArrWord = [];
  arrWordCompleted = [];
  numberIncrease = 0;

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
      this.wordPractice = value;
      value.forEach(item => this.wordRandom.push(item.wordEng));
      this.wordItem = new OptionWordModel( {
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


   unique(arr): any {
    const newArr = [];
     // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      if (newArr.indexOf(arr[i]) === -1) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }


  handleNextOption(): void {
    // this.isTrue = true;
  //  this.handleNextOption();
    // this.option = this.options.ChooseOption;
    this.indexWord += 1;
    this.option = _.sample([1, 2]);
  }

  moveToDefaultOption() {

  }
}
