import { Component, OnInit } from '@angular/core';
import {Member} from '@app/modules/user/models/class.model';
import {ClassService} from '@app/modules/user/services/class.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {

  members: Member[] = [];

  constructor(private classService: ClassService) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  private getMembers(): void {
    this.classService.getRankingMember().subscribe((res) => {
      this.members = res.data;
    });
  }

}
