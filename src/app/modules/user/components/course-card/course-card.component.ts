import {Component, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {Course, CourseModel, ImageSnippet} from '@app/modules/user/models/course.model';
import Swal from 'sweetalert2';
import {MessageModel} from '@app/modules/user/models/message.model';
import {AuthenticationService} from '@app/modules/auth/services';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  courseCard: CourseModel[] = [];
  selectedFile: ImageSnippet;
  imgUrl: any;
  isCreatCourse: boolean;
  newCourse: Course = new  Course({isPublish: false});
  isLogin = false;
  constructor(private courseService: CourseCardService,  private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.courseService.getCourseCard().subscribe(value => {
      this.courseCard = value;
    });
    if (this.authenticationService.userValue){
      this.isLogin = true;
    }
  }
  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.newCourse.imgUrl = event.target.result;
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     this.onSuccess();
      //   },
      //   (err) => {
      //     this.onError();
      //   });
    });
    reader.readAsDataURL(file);
  }

  createCourse(): void{
   this.newCourse.dateCreated = new Date();
   this.courseService.createCourseCard(this.newCourse).subscribe((result: MessageModel<CourseModel>) => {
      if (result.isSuccess){
        Swal.fire(
          'Created!',
          'You are created success!',
          'success'
        );
        this.courseCard.push(new CourseModel({
          course: result.data.course,
          totalWord: result.data.totalWord,
          wordLearned: result.data.wordLearned,
          // isEdit: result.data.isEdit,
        }));
      }else {
        Swal.fire(
          'Created!',
          'Created fail',
          'error'
        );
      }
    }, error => {
     Swal.fire(
       'Created!',
       'Created fail',
       'error'
     );
   });
  }

  onHandleRemoveCourse(courseId: any): void {
   // console.log(this.courseCard)
    const index = this.courseCard.findIndex(_ => _.course.id === courseId);
    this.courseCard.splice(index,1);
  }
}
