import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-complete-review-model',
  templateUrl: './complete-review-model.component.html',
  styleUrls: ['./complete-review-model.component.scss']
})
export class CompleteReviewModelComponent implements OnInit {
  @Output() isOpenTopicChange = new EventEmitter<boolean>();
  @Input() isOpenTopic;
  @Input() scored;
  @Input() totalNumberWord;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToTopic(): void {
    this.isOpenTopicChange.emit(false);
    const course = JSON.parse(localStorage.getItem('courseEng'));
    const param = course.course.courseName.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/course', param]);
  }
}
