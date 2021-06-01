import {Component, Input, OnInit} from '@angular/core';
import {Member} from '@app/modules/user/models/class.model';
import {UserClass, UserInCourse} from '@app/modules/user/models/course.model';
import {UserCourseService} from '@app/modules/user/services/user-course/user-course.service';
import {MessageModel} from '@app/modules/user/models/message.model';
import {AppNotify} from '@app/share/AppNotify';

@Component({
  selector: 'app-course-member',
  templateUrl: './course-member.component.html',
  styleUrls: ['./course-member.component.scss']
})
export class CourseMemberComponent implements OnInit {

  count: number;
  members: UserInCourse[] = [];
  userClassCourse: UserClass = new UserClass();
  constructor(private classService: UserCourseService) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  addMember(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.userClassCourse.courseId = course.course.id;
    this.classService.addUserToClass(this.userClassCourse).subscribe((res: MessageModel<any>) => {
      if (res.isSuccess) {
       this.getMembers();
       AppNotify.success(res.message);
      } else {
        AppNotify.error(res.message);
      }
    });
  }

  removeMember(member: UserInCourse): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.classService.removeUserFromClass(member.userId, course.course.id).subscribe((res) => {
      if (res) {
        // Todo: show notification remove member
        AppNotify.error('Remove successfully');
        this.members = this.members.filter(item => item.userId !== member.userId);
      } else {
        AppNotify.error('Remove fail');
      }
    });
  }

  private getMembers(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.classService.getUserClass(course.course.id).subscribe((res) => {
      this.members = res.filter(user => user.userName !== course.course.authorName);
    });
  }

  private checkDuplicateNameMember(name: string, members: Member[]): boolean {
    return members.some((item) => {
      return item.userName === name;
    });
  }
}
