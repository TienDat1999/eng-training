import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {CourseModel, TopicModel} from '@app/modules/user/models/userModel';
import { ActivatedRoute, Router } from '@angular/router';
import {TopicService} from '@app/modules/user/services/topics/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy  {
  course: CourseModel;
  param: string;
  progress: number;
  private sub: any;
  constructor(private topicService: CourseCardService, private router: Router,
              private route: ActivatedRoute, private topicsS: TopicService) { }
  topics: TopicModel[] = [];
  ngOnInit(): void {
     this.course = JSON.parse(localStorage.getItem('courseEng'));
     this.topicsS.getTopics(this.course.course.id).subscribe(value =>  this.topics = value);
     this.progress = Number(this.course?.wordLearned)  / Number(this.course?.totalWord ) * 100;
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  goToListWord(id): void {
    this.sub = this.route.params.subscribe(params => {
      this.param =  params['name'];
      this.router.navigate(['/course', this.param, id]);
    });
  }
}
