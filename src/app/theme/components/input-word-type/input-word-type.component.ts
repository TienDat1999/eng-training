import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-word-type',
  templateUrl: './input-word-type.component.html',
  styleUrls: ['./input-word-type.component.scss']
})
export class InputWordTypeComponent implements OnInit {

  constructor() { }
  word = 'prepare';
  val: any;
  ngOnInit(): void {
    this.val = this.word.split('');
  }

}
