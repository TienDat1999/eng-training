import {Component, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {TypeWordModel, WordModel} from '@app/modules/user/models/userModel';
import * as _ from 'lodash';

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
  option = 1;
  paramIdl: number;
  indexWord = 0;
  wordPractice: WordModel[] = [];
  wordSimple: TypeWordModel = new TypeWordModel();
  isTrue = false;
  increaseArrWord = [];
  arrWordCompleted = [];
  numberIncrease = 0;

  constructor(private courserService: CourseCardService) {
  }

  ngOnInit(): void {
    this.courserService.receiveParamId$.subscribe(value => {
      this.paramIdl = value;
    });
    this.courserService.getWord(this.paramIdl).subscribe(value => {
      this.wordPractice = value;
      this.wordSimple = {
        id: value[0].id,
        word: value[0].word,
        imgUrl: value[0].imgUrl,
        soundUrl: value[0].soundUrl,
        typeWord: value[0].typeWord,
        example: value[0].example,
        wordRandom: ['assign', 'take', 'book', 'table', 'desk'],
        optionType: [0, 1, 2],
        optionChoose: 1,
        status: false,
      };
    });

  }

  initWordSimple(): void {
    if (this.indexWord < this.wordPractice.length) {
      this.wordSimple = {
        id: this.wordPractice[this.indexWord].id,
        word: this.wordPractice[this.indexWord].word,
        imgUrl: this.wordPractice[this.indexWord].imgUrl,
        soundUrl: this.wordPractice[this.indexWord].soundUrl,
        typeWord: this.wordPractice[this.indexWord].typeWord,
        example: this.wordPractice[this.indexWord].example,
        wordRandom: ['assign', 'take', 'book', 'table', 'desk'],
        optionType: [0, 1, 2],
        optionChoose: this.options.defaultOption,
        status: false,
      };
    }
  }

  handleRelearnWord(index): void {
    this.wordSimple = this.increaseArrWord[index];
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
  handleOption(): void {
    if (this.isTrue) {
      const listWord = this.unique(this.arrWordCompleted);
      if (listWord.length === this.wordPractice.length) {
        console.log('complete');
      }else{
        this.numberIncrease += 1;
        // handle current word
        this.wordSimple.status = true;
        this.increaseArrWord.push(this.wordSimple);
        this.arrWordCompleted.push(this.wordSimple);
        console.log('new array', this.arrWordCompleted);
        // relearn
        if (this.numberIncrease === 4) {
          //  console.log('di vao relearn');
          const indexRandom = _.sample([0, 1, 2]);
          this.handleRelearnWord(indexRandom);
          this.numberIncrease = 0;
          this.increaseArrWord = [];
        } else {
          // handle next word
          this.indexWord += 1;
          this.option = _.sample([1, 2]);
          this.initWordSimple();
        }
      }
    }
    else{
      this.option = this.options.defaultOption;
    }
  }

  handleNextOption(): void {
    // this.isTrue = true;
  //  this.handleNextOption();
    // this.option = this.options.ChooseOption;
    this.indexWord += 1;
    this.option = _.sample([1, 2]);
    this.initWordSimple();
  }

  moveToDefaultOption(): void {
    this.option = this.options.defaultOption;
  }
}
