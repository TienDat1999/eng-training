import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-input-word-type',
  templateUrl: './input-word-type.component.html',
  styleUrls: ['./input-word-type.component.scss']
})
export class InputWordTypeComponent implements OnInit, OnChanges {
  @Output() optionInputWordChange = new EventEmitter();
  @Input() optionInputWord;
  valWord = '';
  @Input() wordInput;
  constructor() { }
  alphabet = 'ABCDEFGHIKLMNOPQRSTVXYZ';
  wordChosen: any;
  wordMean: string;
  @Output() callBackInputNextWordHandel = new  EventEmitter<any>();
  ngOnInit(): void {
   this.inItWordChosen();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.wordInput.firstChange){
     this.inItWordChosen();
    }
  }
  chooseWord(event, reset): void {
    const value = event.target.firstChild.data.trim();
    const listString = this.valWord;
    this.valWord = listString.concat(value);
    if (this.valWord.toUpperCase() === this.wordInput.wordEng.toUpperCase()){
      this.callBackInputNextWordHandel.emit(null);
      reset.value = '';
    }
  }

  correctWord(event, reset): void {
    if (event.toUpperCase() === this.wordInput.wordEng.toUpperCase()){
      this.callBackInputNextWordHandel.emit(null);
      reset.value = '';
    }
  }
  inItWordChosen(): void{
    this.wordChosen = this.alphabet.split('')
      .sort(() => Math.random() - Math.random()).slice(0, 4)
      .concat(this.wordInput.wordEng.toUpperCase().split(''))
      .sort(() => Math.random() - Math.random()).slice(0, this.wordInput.wordEng.length + 4);
    this.wordMean = this.wordInput.define.replace(':', '');
  }

  enterToCheck(): void {
    this.optionInputWordChange.emit(0);
  }
}
