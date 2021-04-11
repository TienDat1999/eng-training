import {Component, OnInit} from '@angular/core';
import {ClassService} from '@app/modules/user/services/class.service';
import {Member} from "@app/modules/user/models/class.model";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  count: number;
  members: Member[] = [];
  inputNameMember: string;

  constructor(private classService: ClassService) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  addMember(): void {
    const isDuplicateName = this.checkDuplicateNameMember(this.inputNameMember, this.members);
    if (isDuplicateName || !this.inputNameMember) {
      // Todo: show notification duplicate
      return;
    }
    const member = this.createNewMember();
    this.classService.addMemberInClass(member).subscribe((res) => {
      if (res) {
        this.members.push(member);
        // Todo: show notification add success
        this.inputNameMember = '';
      } else {
        // Todo: show notification add failure
      }
    });
  }

  removeMember(member): void {
    this.classService.removeMemberInClass(member).subscribe((res) => {
      if (res) {
        // Todo: show notification remove member
        this.members = this.members.filter(item => item.id !== member.id);
      } else {
        // Todo: show notification remove failure
      }
    });
  }

  private getMembers(): void {
    this.classService.getMemberInClass(10).subscribe((res) => {
      this.count = res.count;
      this.members = res.data;
    });
  }

  private createNewMember(): Member {
    const maxId: number = this.members.length;
    return new Member({
      id: maxId + 1,
      fullName: this.inputNameMember,
    });
  }

  private checkDuplicateNameMember(name: string, members: Member[]): boolean {
    return members.some((item) => {
      return item.fullName === name;
    });
  }
}
