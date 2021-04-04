import { Component, OnInit } from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {WordModel} from '@app/modules/user/models/userModel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-word-lesson',
  templateUrl: './word-lesson.component.html',
  styleUrls: ['./word-lesson.component.scss']
})
export class WordLessonComponent implements OnInit {

  words: WordModel[] = [];
  levelParam: number;
  parentParam: string;
  nextLevelParam: any;
  istrue = false;
  constructor(private wordService: CourseCardService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.parentParam = paramMap.get('name');
      this.levelParam = +paramMap.get('id');
      this.nextLevelParam =  +paramMap.get('id') + 1;
    });
    this.wordService.getWord().subscribe(value => {
      this.words = value;
    });
  }

  goToNextPage(): void {
    this.router.navigate(['/learn', this.parentParam, this.nextLevelParam]);
  }
}
