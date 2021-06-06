import { Component, OnInit } from '@angular/core';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {TranslateVnService} from '@app/modules/user/services/translate-vn.service';
import {TranslateOption} from '@app/modules/user/models/translate.option';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {SimpleCourseModel, Course, PublicCourse, } from '@app/modules/user/models/course.model';
import {UserCourseService} from '@app/modules/user/services/user-course/user-course.service';
import {MessageModel} from '@app/modules/user/models/message.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userCourseS: UserCourseService, 
    private courseS: CourseCardService, 
    private router: Router,
    private translateS: TranslateVnService) {
  }
  publicCourser: PublicCourse[] = [];
  ngOnInit(): void {
    this.courseS.getPublicCourseCard().subscribe((value) => {
     this.publicCourser = value;  
    });
  }
  onChooseCourse(id: number): void {
    this.userCourseS.chooseCourse(id).subscribe((value: MessageModel<any>) => {
      if (value.isSuccess){
        Swal.fire(
          'Choose course!',
          'Choose successfully',
          'success'
        );
      }else{
        Swal.fire(
          'Choose course!',
          'A course already exists in your course list',
          'warning'
        );
      }
    });
  }
  goDetailcourse(e){
    this.router.navigate(['/course-detail']);
  }
}
