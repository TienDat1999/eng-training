import {Component, OnInit} from '@angular/core';
import {Member} from '@app/modules/user/models/class.model';
import {ClassService} from '@app/modules/user/services/class.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

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
