import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import readXlsxFile from 'read-excel-file';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';
import {TopicService} from '@app/modules/user/services/topics/topic.service';
import {AddTopicModel} from '@app/modules/user/models/topic.model';
import Swal from 'sweetalert2';
import {TopicStatusModel} from '@app/modules/user/models/user.model';

@Component({
  selector: 'app-modal-topic',
  templateUrl: './modal-topic.component.html',
  styleUrls: ['./modal-topic.component.scss']
})
export class ModalTopicComponent implements OnInit {
  @Output() isOpenTopicChange = new EventEmitter<boolean>();
  @Input() isOpenTopic;
  @Output() reloadTopic = new EventEmitter<any>();
  wordRecord: CrawWordModel[] = [];
  topicName: string;
  courseId: number;


  constructor( private getWordService: CrawWordsService, private topicService: TopicService,
  ) {
  }

  ngOnInit(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.courseId = course.course.id;
  }

  excelRead(e): void {
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
      if (data.rows) {
        data.rows.forEach(elm => {
          this.wordRecord.push(elm);
        });
        //console.log(this.wordRecord)
      }
    });
  }

  backToTopic(): void {
    this.isOpenTopicChange.emit(false);
    this.topicName = '';
    this.wordRecord = [];
  }

  onHandelAddWord(): void {
    this.wordRecord.push(new CrawWordModel());
  }

  onRemoveCord(e, index): void {
    this.wordRecord.splice(index, 1);
  }

  onHandelFillWord(): void {
    this.wordRecord.forEach(wordItem => {
      if (!!wordItem.wordEng) {
        this.getWordService.fillWord(wordItem.wordEng).subscribe(value => {
          if (!wordItem.wordType) {
            wordItem.wordType = value?.wordType;
          }
          if (!wordItem.define) {
            wordItem.define = value?.define;
          }
          if (!wordItem.example) {
            wordItem.example = value?.example;
          }
          wordItem.ipa = value?.ipa;
          wordItem.audioUrl = value?.audioUrl;
        });
      }
    });

  }

  onHandelSaveTopic(): void {
    const newWords = this.wordRecord.filter(_ => !!_.ipa && !!_.wordEng);
    const topic = new AddTopicModel({
      topicName: this.topicName,
      words: newWords,
      courseId: this.courseId,
    });
    if (!!topic.topicName){
      if (newWords.length > 0){
        this.topicService.addTopics(topic).subscribe( result => {
          if (result.isSuccess){
            this.isOpenTopicChange.emit(false);
            this.reloadTopic.emit(null);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Add topic success fully',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          this.topicName = '';
          this.wordRecord = [];
        }, error => console.log(error));
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please enter all fields',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }else{
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please input the topic name',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  saveWord(e: any, index): void {
    this.wordRecord[index].wordEng = e.target.value;
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

  changeNameTopic(e): void {
    this.topicName = e.target.value;
  }
}
