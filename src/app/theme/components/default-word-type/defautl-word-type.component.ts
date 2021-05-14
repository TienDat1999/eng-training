import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WordModel} from '@app/modules/user/models/user.model';
import {TranslateVnService} from '@app/modules/user/services/translate-vn.service';
import {TranslateOption} from '@app/modules/user/models/translate.option';

@Component({
  selector: 'app-default-word-type',
  templateUrl: './default-word-type.component.html',
  styleUrls: ['./default-word-type.component.scss']
})
export class DefaultWordTypeComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  @Input() wordDefault: WordModel;
  defineTranslate: string;
  isTranslate = false;
  constructor(private translateS: TranslateVnService) {
  }

  ngOnInit(): void {
  }

  playAudio(): void {
    const audio = new Audio();
    audio.src = this.wordDefault.audioUrl;
    audio.load();
    audio.play();
  }

  onTranslate(): void {
    const data = new TranslateOption({
      data: this.wordDefault.define,
      target: 'vi',
      source: 'en',
    });
    this.translateS.translateWord(data).subscribe( value => {
      this.defineTranslate = value.data.translations[0].translatedText;
    }, error => {
      console.log(error) }, () => {
      this.isTranslate = true;
    });
  }
}
