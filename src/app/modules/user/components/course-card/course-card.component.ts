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

  constructor(private courseService: CourseCardService, private router: Router) {
  }

  param: any = null;
  ngOnInit(): void {
    this.courseService.getCourseCard().subscribe(value => {
      this.courseCard = value;
      console.log(value);
    });
  }

  getParamCard(nameCard: string): any {
    this.param = nameCard.toLowerCase().trim().split(/\s+/).join('-');
  }
}
