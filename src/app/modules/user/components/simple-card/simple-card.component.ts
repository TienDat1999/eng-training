import {Component, Input, OnInit} from '@angular/core';
import {SimpleCardModel} from '@app/modules/user/models/userModel';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {
  cards: 21;
  @Input() card: SimpleCardModel;
  constructor() { }

  ngOnInit(): void {
  }

  showPopupTarget(event: MouseEvent): void {

  }
}
