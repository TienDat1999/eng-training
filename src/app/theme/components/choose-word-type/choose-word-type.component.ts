import {Component, Input, OnInit} from '@angular/core';
import {OptionWordModel} from '@app/modules/user/models/userModel';
@Component({
  selector: 'app-choose-word-type',
  templateUrl: './choose-word-type.component.html',
  styleUrls: ['./choose-word-type.component.scss']
})
export class ChooseWordTypeComponent implements OnInit {
  @Input() word: OptionWordModel;
  @Input() randomList: [];
  randomWordList = [];
  constructor() { }

  ngOnInit(): void {
    console.log('word', this.word);
    this.initWordRandom();
  }
  initWordRandom(): void{
    const randomArray = this.randomList.sort(() => Math.random() - Math.random()).slice(0, 4);
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

}
