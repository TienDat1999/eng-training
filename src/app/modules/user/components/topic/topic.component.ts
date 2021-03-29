import { Component, OnInit } from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {TopicModel} from '@app/modules/user/models/userModel';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  constructor(private topicService: CourseCardService) { }
  topics: TopicModel[] = [];
  ngOnInit(): void {
    this.topicService.getTopic().subscribe(value => this.topics = value);
  }

}
