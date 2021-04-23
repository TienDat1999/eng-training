import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WordModel} from '@app/modules/user/models/userModel';

@Component({
  selector: 'app-default-word-type',
  templateUrl: './default-word-type.component.html',
  styleUrls: ['./default-word-type.component.scss']
})
export class DefaultWordTypeComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  @Input() wordDefault: WordModel;
  wordShow: string;
  wordExample: string;
  constructor() { }

  ngOnInit(): void {
    this.wordShow = this.wordDefault.define.replace(':', '');
    if (!!this.wordDefault.example){
      this.wordExample = this.wordDefault.example.replace(/<\/?strong[^>]*>/g, '').replace(/<\/?span[^>]*>/g, '');
    }
    console.log(this.wordDefault);
  //  this.playAudio();
  }
  playAudio(): void{
    const audio = new Audio();
    audio.src = this.wordDefault.audioUrl;
    audio.load();
    audio.play();
  }
}
