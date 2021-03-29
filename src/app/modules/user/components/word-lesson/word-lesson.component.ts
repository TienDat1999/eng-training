import { Component, OnInit } from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {WordModel} from '@app/modules/user/models/userModel';
@Component({
  selector: 'app-word-lesson',
  templateUrl: './word-lesson.component.html',
  styleUrls: ['./word-lesson.component.scss']
})
export class WordLessonComponent implements OnInit {

  words: WordModel[] = [];
  constructor(private wordService: CourseCardService) { }

  ngOnInit(): void {
    this.wordService.getWord().subscribe(value => {
      console.log(value);
      this.words = value;
    });
  }

}
