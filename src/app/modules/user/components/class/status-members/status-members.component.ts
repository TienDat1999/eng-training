import {Component, OnInit} from '@angular/core';
import {ClassService} from '@app/modules/user/services/class.service';
import {Member, ValueKeyModel} from '@app/modules/user/models/class.model';
import {ExerciseStatusType} from '@app/modules/share/enum';

@Component({
  selector: 'app-status-members',
  templateUrl: './status-members.component.html',
  styleUrls: ['./status-members.component.scss']
})
export class StatusMembersComponent implements OnInit {
  status: ExerciseStatusType = 0;
  members: Member[] = [];
  valueKeyModel: ValueKeyModel[] = [
    new ValueKeyModel({key: ExerciseStatusType.Complete, value: 'Complete'}),
    new ValueKeyModel({key: ExerciseStatusType.Incomplete, value: 'Incomplete'}),
  ];

  constructor(private classService: ClassService) {
  }

  ngOnInit(): void {
    this.getMembers(50, this.status);
  }

  private getMembers(size, status): void {
    this.classService.getMemberByStatus(size, status).subscribe((res) => {
      this.members = res.data;
    });
  }

  selectStatus(status: number): void {
    this.status = status;
    this.getMembers(50, this.status);
  }
}
