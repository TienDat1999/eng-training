import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {
  @Output() option = new EventEmitter<boolean>();
  @Input() textContentNotify: string;
  @Input() textHeader: string;
  constructor() { }

  ngOnInit(): void {
  }

  acceptCompetition(): void {
    this.option.emit(true);
  }

  refuseCompetition(): void {
    this.option.emit(false);
  }
}
