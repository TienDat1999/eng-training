import {Component, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {CourseModel} from '@app/modules/user/models/userModel';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  courseCard: CourseModel[] = [];
  constructor(private courseService: CourseCardService) {
  }

  ngOnInit(): void {
    this.courseService.getCourseCard().subscribe(value => {
      this.courseCard = value;
    });
  }
}
