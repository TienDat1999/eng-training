import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseModel, SimpleCourseModel, ImageSnippet} from '@app/modules/user/models/course.model';
import {Router} from '@angular/router';

import {CourseCardService} from '@app/modules/user/services/course-card.service';
import Swal from 'sweetalert2';
import {MessageModel} from '@app/modules/user/models/message.model';


@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {
  progress: number;
  isShowModal = false;
  isEdit = false;
  @Input() card: CourseModel;
  simpleCourse: SimpleCourseModel;
  selectedFile: ImageSnippet;
  @Output() onRemoveEvent = new EventEmitter<any>();
  // @Output() onRemoveEvent = new EventEmitter<any>();
  constructor(private router: Router, private courseService: CourseCardService) {}

  ngOnInit(): void {
      if (this.card?.totalWord === 0){
        this.progress = 0;
      }else{
        this.progress = Number(this.card?.wordLearned)  / Number(this.card?.totalWord) * 100;
      }
      const user = JSON.parse(localStorage.getItem('userEnglishTraining'));
      this.isCanEdit(user.userId, this.card.course.authorId);
  }
  isCanEdit(userIdLocal, userIdServer): void{
    if (userIdLocal ===  userIdServer){
      this.card.isEdit = true;
    }
  }
  showPopupTarget(): void {
    this.isShowModal = true;
  }

  getParamCard(nameCard: string): void {
    const param = nameCard.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/course', param]);
    localStorage.setItem('courseEng', JSON.stringify(this.card));
  }

  onEditCourse(): void {
    this.isEdit = true;
    this.simpleCourse = new SimpleCourseModel({
      courseName : this.card.course.courseName,
      id: this.card.course.id,
    });
  }
  processFile(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.card.course.imgUrl = event.target.result;
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
  onUpdateCourse(): void {
    // this.simpleCourse.imgUrl = this.card.course.imgUrl;
   // console.log(this.card.course);
    this.courseService.updateCourseCard(this.card.course).subscribe((result: MessageModel<any>) => {
      if (result.isSuccess){
        Swal.fire(
          'Updated course!',
          'Updated successfully',
          'success'
        );
        this.isEdit = false;
      }
    });
  }

  onRemoveCourse(e): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onRemoveEvent.emit(this.card.course.id);
        this.courseService.deleteCourseCard(this.card.course.id).subscribe((val: MessageModel<any>) => {
          if (val.isSuccess){
            Swal.fire(
              'Deleted!',
              'Deleted successfully',
              'success'
            );
          }else{
            Swal.fire(
              'Deleted!',
              'Deleted fail',
              'error')
          }
        });
      }
    });
  }

  setPublic(course): void {
    course.isPublish = !course.isPublish;
  }
}
