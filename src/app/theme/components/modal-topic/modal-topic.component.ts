import {Component, Input, OnInit} from '@angular/core';
import readXlsxFile from 'read-excel-file';
@Component({
  selector: 'app-modal-topic',
  templateUrl: './modal-topic.component.html',
  styleUrls: ['./modal-topic.component.scss']
})
export class ModalTopicComponent implements OnInit {

 @Input() isOpenTopic;
  wordRecord: any = [];
  constructor() { }

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
      'type': {
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
      console.log(this.wordRecord)
    }
    });
  }
}
