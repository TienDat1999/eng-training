import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WordModel} from '@app/modules/user/models/userModel';



@Component({
  selector: 'app-choose-word-type',
  templateUrl: './choose-word-type.component.html',
  styleUrls: ['./choose-word-type.component.scss']
})
export class ChooseWordTypeComponent implements OnInit, OnChanges {
  @Output() optionChooseWordChange = new EventEmitter<number>();
  @Input() optionChooseWord;
  @Input() word: WordModel;
  @Input() wordList: [string];
  @Output() callBackChooseNextWordHandel = new  EventEmitter<any>();
  randomWordList = [];
  wordShow: string;

  isCorrectChosen: boolean;
  @Output() isCorrectChange = new EventEmitter<boolean>();
  @Input()
  get isCorrect(): boolean{
      return this.isCorrectChosen;
  }
  set isCorrect(val){
    this.isCorrectChosen = val;
    this.isCorrectChange.emit(val);
  }



  constructor() { }

  ngOnInit(): void {
    this.initWordRandom();
  }
  initWordRandom(): void{
    this.wordShow = this.word.define.replace(':', '');
    const randomArray = this.wordList.sort(() => Math.random() - Math.random()).slice(0, 4);
    const wordExist  = randomArray.filter(item => item !== this.word.wordEng);
    if ( wordExist.length === 4){
      const newRandom = [];
      newRandom.push(...wordExist.slice(1, 4), this.word.wordEng);
      this.randomWordList = newRandom.sort(() => Math.random() - Math.random()).slice(0, 4);
    }else{
      const newRandom = [];
      newRandom.push(...wordExist, this.word.wordEng);
      this.randomWordList = newRandom.sort(() => Math.random() - Math.random()).slice(0, 4);
    }
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
    this.isCorrect = true ;
    document.getElementById(event.target.id).classList.add('is-correct');
    setTimeout(() => {
       this.callBackChooseNextWordHandel.emit(null);
       this.isCorrect = null ;
       document.getElementById(event.target.id).classList.remove('is-correct');
     } , 1000);
    this.playAudio();
   }else{
     document.getElementById(event.target.id).classList.add('is-correct');
     this.isCorrect = false ;
     setTimeout(() => {
       this.optionChooseWordChange.emit(0);
       this.isCorrect = null ;
     } , 1000);
     this.optionChooseWordChange.emit(0);
   }
  }
  playAudio(): void{
    const audio = new Audio();
    audio.src = this.word.audioUrl;
    audio.load();
    audio.play();
  }
}
