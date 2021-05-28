import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-count-down-popup',
  templateUrl: './count-down-popup.component.html',
  styleUrls: ['./count-down-popup.component.scss']
})
export class CountDownPopupComponent implements OnInit {
  @Input() isOpenCountdown: boolean;
  @Input() isShowIConFight: boolean;
  @Input() countDownNumber: number;
  @Output() completeCountDown = new EventEmitter<boolean>();
  showCountDownNumber = true;

  constructor() {
  }

  ngOnInit(): void {
    this.onCountDownNumber();
  }

  onCountDownNumber(): void {
    if (!!this.countDownNumber) {
      const cd = setInterval(() => {
        this.countDownNumber -= 1;
        if (this.countDownNumber < 1) {
          clearInterval(cd);
          this.showCountDownNumber = false;
          setTimeout(() => {
            this.isOpenCountdown = false;
            this.completeCountDown.emit(true);
          }, 1000);

        }
      }, 1000);
    }
  }
}
