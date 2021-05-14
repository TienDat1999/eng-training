import {Component, Input, OnInit} from '@angular/core';
import {Member} from '@app/modules/user/models/class.model';
import {ClassService} from '@app/modules/user/services/class.service';
import {UserClass, UserInCourse} from '@app/modules/user/models/course.model';
import {UserCourseService} from '@app/modules/user/services/user-course/user-course.service';
import Swal from 'sweetalert2';
import {MessageModel} from '@app/modules/user/models/message.model';

@Component({
  selector: 'app-course-member',
  templateUrl: './course-member.component.html',
  styleUrls: ['./course-member.component.scss']
})
export class CourseMemberComponent implements OnInit {

  count: number;
  members: UserInCourse[] = [];
  inputNameMember: string;
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
       Swal.fire(
          'Notification',
          `${res.message}`,
          'success'
        );
      } else {
        Swal.fire(
          'Notification!',
          `${res.message}`,
          'error'
        );
      }
    });
  }

  removeMember(member: UserInCourse): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.classService.removeUserFromClass(member.userId, course.course.id).subscribe((res) => {
      if (res) {
        // Todo: show notification remove member
        Swal.fire(
          'Notification',
          `Remove fail`,
          'success'
        );
        this.members = this.members.filter(item => item.userId !== member.userId);
      } else {
        Swal.fire(
          'Notification!',
          `Remove fail`,
          'error'
        );
      }
    });
  }

  private getMembers(): void {
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.classService.getUserClass(course.course.id).subscribe((res) => {
      this.members = res;
    });
  }

  private checkDuplicateNameMember(name: string, members: Member[]): boolean {
    return members.some((item) => {
      return item.fullName === name;
    });
  }
}
