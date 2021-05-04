import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {WordLearnedModel, WordModel} from '@app/modules/user/models/userModel';
import * as _ from 'lodash';
import {WordTopicsService} from '@app/modules/user/services/wordTopics/word-topics.service';
import {Router} from '@angular/router';
import {IconType} from '@app/share/enum';

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
  isShowModal = false;
  pointTarget = 1000;
  repeatNumber = 0;
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
  // isCorrectChosen: boolean;
  completeWord: WordLearnedModel [] = [];
  typeIconClick: number;
  iconType = IconType;
  constructor(private courserService: CourseCardService, private wordsS: WordTopicsService, private router: Router) {
  }

  // Listen ENTER
  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (this.option === 0) {
      this.handleNextOption();
    }
  }

  ngOnInit(): void {
    this.courserService.receiveParamId$.subscribe(value => {
      console.log('paramId', value);
      localStorage.setItem('paramTopicID', value);
      this.paramIdl = value;
    });
    this.initWordItem();
  }

  initWordItem(): void {
    const id = localStorage.getItem('paramTopicID');
    const course = JSON.parse(localStorage.getItem('courseEng'));
    const param = !!id ? id : this.paramIdl;
    this.wordsS.getWordList(course.course.id, Number(param)).subscribe(value => {
      // console.log('get', value);
      this.scoreTurn = 90 / (value.words.length * (this.repeatNumber + 1));
      this.wordPractice = value.words.map(item => {
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
      value.words.forEach(item => this.wordRandom.push(item.wordEng));
      this.wordItem = new WordModel({
        wordEng: value.words[0].wordEng,
        imgUrl: value.words[0].imgUrl,
        audioUrl: value.words[0].audioUrl,
        wordType: value.words[0].wordType,
        example: value.words[0].example,
        ipa: value.words[0].ipa,
        define: value.words[0].define,
        repeatNumber: 0,
      });
    });
  }

  handleNextOption(): void {
    this.indexWord += 1;
    this.option = _.sample([1, 2]);
  }

  moveToDefaultOption(): void {
    this.option = 0;
  }

  callBackNextWordHandel(): void {
    // this.currentScore += 100;

    if (this.progressNumber <= 100) {
      this.progressNumber += this.scoreTurn;
    }
    this.option = _.sample([1, 2]);
    this.indexWord = _.random(this.wordPractice.length - 1);
    if (!!this.wordPractice[this.indexWord]) {
      if (this.wordPractice[this.indexWord].repeatNumber < this.repeatNumber) {
        const newRepeatNumber = this.wordPractice[this.indexWord].repeatNumber + 1;
        this.initWord(this.indexWord, newRepeatNumber);
        this.wordPractice[this.indexWord].repeatNumber = newRepeatNumber;
      } else {
        // Call API to save status of word
        const course = JSON.parse(localStorage.getItem('courseEng'));
        const completeWord = new WordLearnedModel({
          WordId: this.wordPractice[this.indexWord].id,
          UserCourseId: course.course.id,
          TopicId: Number(localStorage.getItem('paramTopicID')),
        });
        this.courserService.addSimpleWordCompleted(completeWord).subscribe();
        // const newWords = this.wordPractice.filter(item => item.repeatNumber < this.repeatNumber);
        const newRepeatNumber = this.wordPractice[this.indexWord].repeatNumber + 1;
        this.initWord(this.indexWord, newRepeatNumber);
        this.wordPractice[this.indexWord].repeatNumber = newRepeatNumber;
        const findIndexId = this.wordPractice.findIndex(elm => elm.id === this.wordPractice[this.indexWord].id);
        this.wordPractice.splice(findIndexId, 1);
      }
    } else {
      console.log('complete');
      this.isShowModal = true;
    }

  }

  initWord(index, newRepeatNumber): void {
    this.wordItem = new WordModel({
      wordEng: this.wordPractice[index].wordEng,
      imgUrl: this.wordPractice[index].imgUrl,
      audioUrl: this.wordPractice[index].audioUrl,
      wordType: this.wordPractice[index].wordType,
      example: this.wordPractice[index].example,
      ipa: this.wordPractice[index].ipa,
      define: this.wordPractice[index].define,
      repeatNumber: newRepeatNumber,
    });
  }

  backToTopic(): void {
    this.isShowModal = false;
    const course = JSON.parse(localStorage.getItem('courseEng'));
    const param = course.course.courseName.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/course', param]);
  }

  continueLean(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    const param = course.course.courseName.toLowerCase().trim().split(/\s+/).join('-');
    const topicId = localStorage.getItem('paramTopicID');
    this.router.navigate(['/course', param, Number(topicId) + 1]);
  }
}
