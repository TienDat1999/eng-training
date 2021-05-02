import { Component, OnInit } from '@angular/core';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crawWord: CrawWordsService) {
  }

  wordList: any = [];
  FillList: any = [];

  ngOnInit(): void {
  }

  getWord(): void {
    this.crawWord.getWords().subscribe(data => this.wordList = data,
      error => console.error('Observer got an error: ' + error),
      () => console.log('get complete'));
  }
 async fillWords(): Promise<void> {
   await this.wordList.forEach((word) => {
      this.crawWord.fillWord(word).subscribe(value => {
          if (!!value) {
            this.FillList.push(value);
          }
          console.log(this.FillList);
        },
        err => console.error('Observer got an error: ' + err),
      );
    });
  }
  updateData(): void{
    this.crawWord.updateWord(this.FillList).subscribe(value => console.log('done', value));
  }
}
