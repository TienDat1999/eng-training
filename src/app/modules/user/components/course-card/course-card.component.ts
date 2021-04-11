import {Component, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {SimpleCardModel} from '@app/modules/user/models/userModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  courseCard: SimpleCardModel[] = [];
  value= '';
  constructor(private courseService: CourseCardService) {
  }

  ngOnInit(): void {
    this.courseService.getCourseCard().subscribe(value => {
      this.courseCard = value;
    });
  }

  onSubmitTarget() {

  }
}
