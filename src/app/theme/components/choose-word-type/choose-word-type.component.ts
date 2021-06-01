import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WordModel} from '@app/modules/user/models/user.model';
import {IconType} from '@app/share/enum';


@Component({
  selector: 'app-choose-word-type',
  templateUrl: './choose-word-type.component.html',
  styleUrls: ['./choose-word-type.component.scss']
})
export class ChooseWordTypeComponent implements OnInit, OnChanges {
  @Output() optionChooseWordChange = new EventEmitter<number>();
  @Input() optionChooseWord;
  @Input() word: WordModel;
  @Input() wordList: WordModel[];
  @Output() callBackChooseNextWordHandel = new  EventEmitter<any>();
  randomWordList = [];
  userId: string;
  isCorrectChosen: number;
  @Output() isCorrectChange = new EventEmitter<number>();
  @Input()
  get isCorrect(): number{
      return this.isCorrectChosen;
  }
  set isCorrect(val){
    this.isCorrectChosen = val;
    this.isCorrectChange.emit(val);
  }

  constructor() { }

  ngOnInit(): void {
    this.initWordRandom();
    const value = JSON.parse(localStorage.getItem('userEnglishTraining')) ;
    this.userId = value?.userId;
  }
  initWordRandom(): void{
    const randomArray = this.wordList.sort(() => Math.random() - Math.random()).slice(0, 3);
    const newRandom = [];
    newRandom.push(...randomArray, this.word);
    this.randomWordList = newRandom.sort(() => Math.random() - Math.random()).slice(0, 4);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.word){
      if (!changes.word.firstChange){
        this.initWordRandom();
      }
    }
  }
  chooseWord(event): void {
   const value = event.target.firstChild.data;
   if (value.trim() === this.word.wordEng.trim()){
    this.isCorrect = IconType.correct ;
    document.getElementById(event.target.id).classList.add('is-correct');
    setTimeout(() => {
       this.callBackChooseNextWordHandel.emit(this.userId);
       this.isCorrect = IconType.dontKnow ;
       document.getElementById(event.target.id).classList.remove('is-correct');
     } , 1000);
    this.playAudio();
   }else{
       document.getElementById(event.target.id).classList.add('incorrect');
       this.isCorrect = IconType.inCorrect ;
       setTimeout(() => {
         this.optionChooseWordChange.emit(0);
         document.getElementById(event.target.id).classList.remove('incorrect');
         this.isCorrect = IconType.dontKnow  ;
       } , 1000);
   }
  }
  playAudio(): void{
    const audio = new Audio();
    audio.src = this.word.audioUrl;
    audio.load();
    audio.play();
  }
}
