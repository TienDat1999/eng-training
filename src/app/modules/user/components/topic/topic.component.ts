import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {TopicModel} from '@app/modules/user/models/userModel';
import { ActivatedRoute, Router } from '@angular/router';
import {TopicService} from '@app/modules/user/services/topics/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy  {
  param: string;
  private sub: any;
  constructor(private topicService: CourseCardService, private router: Router,
              private route: ActivatedRoute, private topicsS: TopicService) { }
  topics: TopicModel[] = [];
  ngOnInit(): void {
    this.topicsS.getTopics().subscribe(value =>  this.topics = value);
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
