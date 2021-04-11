import {Component, Input, OnInit} from '@angular/core';
import {SimpleCardModel} from '@app/modules/user/models/userModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {
  cards: 21;
  isShow = false;
  @Input() card: SimpleCardModel;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  showPopupTarget(): void {
    this.isShow = true;
    console.log(this.isShow);
  }

  getParamCard(nameCard: string): void {
    const param = nameCard.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/learn', param]);
  }

}
