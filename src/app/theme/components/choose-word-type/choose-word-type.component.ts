import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-word-type',
  templateUrl: './choose-word-type.component.html',
  styleUrls: ['./choose-word-type.component.scss']
})
export class ChooseWordTypeComponent implements OnInit {

  constructor() { }
  chooseWord = ['drawer', 'separate', 'prepare', 'hang','arrange', 'bench'];
  ngOnInit(): void {
  }

}
