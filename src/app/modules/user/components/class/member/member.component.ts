import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  members = [
    {id: 1, name: 'Mark Otto'},
    {id: 2, name: 'Jacob Thornton'},
    {id: 3, name: 'Thornton Bird'},
  ];
  inputNameMember: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  addMember(): void {
    const checkDuplicate = (this.members.some((item) => {
      return item.name === this.inputNameMember;
    }));
    if (checkDuplicate || !this.inputNameMember) {
      // show notification duplicate
      return;
    }
    const maxId: number = this.members.length;
    this.members.push({id: maxId + 1, name: this.inputNameMember});
    this.inputNameMember = '';
  }
}
