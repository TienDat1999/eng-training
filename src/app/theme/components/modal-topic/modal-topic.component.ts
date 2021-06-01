import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import readXlsxFile from 'read-excel-file';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';
import {TopicService} from '@app/modules/user/services/topics/topic.service';
import {AddTopicModel} from '@app/modules/user/models/topic.model';
import {AppNotify} from '@app/share/AppNotify';

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
  isWaitLoad: boolean;

  constructor(private getWordService: CrawWordsService, private topicService: TopicService,
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
        prop: 'wordEng',
        type: String,
        required: true,
      },
      'type': {
        prop: 'wordType',
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
          // console.log(elm);
          this.wordRecord.push(elm);
        });
        // console.log(this.wordRecord)
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
        this.isWaitLoad = true;
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
        }, error => {
        }, () => {
          this.isWaitLoad = false;
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
    if (!!topic.topicName) {
      if (newWords.length > 0) {
        this.topicService.addTopics(topic).subscribe(result => {
          if (result.isSuccess) {
            this.isOpenTopicChange.emit(false);
            this.reloadTopic.emit(null);
            AppNotify.success('Add topic successfully');
          }
          this.topicName = '';
          this.wordRecord = [];
        }, error => console.log(error));
      } else {
        AppNotify.alert('Please enter all fields', 'Notify');
      }
    } else {
      AppNotify.warning('Please input the topic name');
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
