import { Component, OnInit } from '@angular/core';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private crawWord: CrawWordsService) { }
  wordList: any = [];
  words = ['Agreement',
    'Agreeable',
    'Assurance',
    'Determine',
    'Engage',
    'Establish',
    'Obligate',
    'Obligation',
    'Provision',
  ];
  ngOnInit(): void {
  }

  getWord(): void {
    this.crawWord.getWords().subscribe(data => console.log(data));
    // this.words.forEach(word => {
    //   this.crawWord.fillWord(word).subscribe( value => this.wordList.push(value),
    //     err => console.error('Observer got an error: ' + err),
    //     () => console.log(this.wordList));
    // });
  }
}
