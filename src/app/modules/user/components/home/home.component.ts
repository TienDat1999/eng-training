import { Component, OnInit } from '@angular/core';
import {CrawWordsService} from '@app/modules/user/services/craw-words.service';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {TranslateVnService} from '@app/modules/user/services/translate-vn.service';
import {TranslateOption} from '@app/modules/user/models/translate.option';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {SimpleCourseModel, Course, PublicCourse,} from '@app/modules/user/models/course.model';
import {UserCourseService} from '@app/modules/user/services/user-course/user-course.service';
import {MessageModel} from "@app/modules/user/models/message.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userCourseS: UserCourseService, private courseS: CourseCardService, private translateS: TranslateVnService) {
  }
  // defineVnm: string;
  // wordList: CrawWordModel[] = [];
  // FillList: any = [];
  // newList: CrawWordModel[] = [];
  publicCourser: PublicCourse[] = [];
  ngOnInit(): void {
    this.courseS.getPublicCourseCard().subscribe((value) => {
     this.publicCourser = value;
    });
  }

  // getWord(): void {
  //   this.crawWord.getWords().subscribe(data => this.wordList = data,
  //     error => console.error('Observer got an error: ' + error),
  //     () => {
  //       console.log('get complete');
  //     //  console.log(this.wordList)
  //     });
  // }
  // fillWords(): void{
  //   let i = 0;
  //   const iter = setInterval(() => {
  //     const data = new TranslateOption({
  //      data: this.wordList[i].define,
  //      target: 'vi' ,
  //      source: 'en',
  //    });
  //     this.translateS.translateWord(data).subscribe(val => {
  //       this.newList.push(new CrawWordModel({
  //         id: this.wordList[i].id,
  //         wordEng: this.wordList[i].wordEng,
  //         wordType: this.wordList[i].wordType,
  //         define: this.wordList[i].define,
  //         example:  this.wordList[i].example,
  //         ipa: this.wordList[i].ipa,
  //         audioUrl: this.wordList[i].audioUrl,
  //         defineVn: val.data.translations[0].translatedText,
  //       }));
  //    }, error => {}, () => {
  //    });
  //     i++;
  //     if (i >= 5 ){
  //       clearInterval(iter);
  //       console.log(this.newList);
  //     }
  //   }, 1000);
  // }
  // updateData(): void{
  //   const data = new TranslateOption({
  //     data: 'the method or possibility of getting near to a place or person',
  //     target: 'vi' ,
  //     source: 'en',
  //   });
  //   this.translateS.translateWord(data).subscribe(val => {
  //     console.log(val);
  //   });
  // }
  onChooseCourse(id: number): void {
    this.userCourseS.ChooseCourse(id).subscribe((value: MessageModel<any>) => {
      if (value.isSuccess){
        Swal.fire(
          'Choose course!',
          'Choose successfully',
          'success'
        );
      }else{
        Swal.fire(
          'Choose course!',
          'A course already exists in your course list',
          'warning'
        );
      }
    });
  }
}
