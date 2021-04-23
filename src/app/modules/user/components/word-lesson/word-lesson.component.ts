import { Component, OnInit } from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {WordModel} from '@app/modules/user/models/userModel';
import {ActivatedRoute, Router} from '@angular/router';
import {WordTopicsService} from '@app/modules/user/services/wordTopics/word-topics.service';

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

  // tslint:disable-next-line:max-line-length
  constructor(private wordService: CourseCardService, private route: ActivatedRoute,  private router: Router, private wordsS: WordTopicsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.parentParam = paramMap.get('name');
      this.levelParam = +paramMap.get('id');
      this.nextLevelParam =  +paramMap.get('id') + 1;
    });
    this.showWord();

  }

  goToNextPage(): void {
    this.router.navigate(['/course', this.parentParam, this.nextLevelParam]);
    this.showWord();
  }

  backToPrevious(): void {
    if (this.levelParam > 1){
      this.levelParam = this.levelParam - 1;
      this.router.navigate(['/course', this.parentParam, this.levelParam]);
      this.showWord();
    }
  }


  learnWord($event: MouseEvent): void {
    this.router.navigate(['/detail']);
    this.wordService.sendParmaId(this.levelParam);
  }
  showWord(): void{
    this.wordsS.getWordList(this.levelParam).subscribe(value => {
      this.words = value;
    });
  }
}
