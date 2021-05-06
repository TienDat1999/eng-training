import {Component, Input, OnInit} from '@angular/core';
import readXlsxFile from 'read-excel-file';
import {CrawWordModel, WordTopicModel} from '@app/modules/user/models/word.model';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';

@Component({
  selector: 'app-modal-topic',
  templateUrl: './modal-topic.component.html',
  styleUrls: ['./modal-topic.component.scss']
})
export class ModalTopicComponent implements OnInit {

 @Input() isOpenTopic;
  wordRecord: CrawWordModel[] = [];
  constructor( private getWordService: CrawWordsService) { }

  ngOnInit(): void {
  }
  excelRead(e): void{
    // @ts-ignore
    const schema = {
      'word': {
          prop: 'word',
          type: String,
          required: true,
      },
      'wordType': {
        prop: 'type',
        type: String,
        required: false,
      },
      'define': {
        prop: 'define',
        type: String,
        required: false,
      },
      'example': {
        prop: 'example',
        type: String,
        required: false,
      }
    };

    readXlsxFile(e.target.files[0], {schema}).then((data) => {
    if (data.rows){
      data.rows.forEach(elm => {
        this.wordRecord.push(elm);
      });
      //console.log(this.wordRecord)
    }
    });
  }

  backToTopic(): void {

  }

  onHandelAddWord(): void {
    this.wordRecord.push(new CrawWordModel());
  }

  onRemoveCord(e, index): void {
   this.wordRecord.splice(index, 1);
  }

  onHandelFillWord(): void {
    this.wordRecord.forEach(wordItem => {
      this.getWordService.fillWord(wordItem.word).subscribe(value => {
        if (!wordItem.wordType){
          wordItem.wordType = value.wordType;
        }
        if (!wordItem.define){
          wordItem.define = value.define;
        }
        if (!wordItem.example){
          wordItem.example = value.example;
        }
        wordItem.ipa = value.ipa;
        wordItem.soundUrl = value.soundUrl;
      });
      console.log(this.wordRecord);
    } );

  }

  onHandelSaveTopic(): void {

  }

  saveWord(e: any, index): void {
    this.wordRecord[index].word = e.target.value;
  }


  saveWordType(e, index: number): void {
    this.wordRecord[index].wordType = e.target.value;
  }

  saveDefine(e, index: number): void {
    this.wordRecord[index].define = e.target.value;
  }

  saveExample(e, index: number): void {
    this.wordRecord[index].example = e.target.value;
  }
}
