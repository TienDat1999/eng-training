import {Component, Input, OnInit} from '@angular/core';
import {CourseModel, SimpleCourseModel} from '@app/modules/user/models/userModel';
import {Router} from '@angular/router';
import {ImageServiceService} from '@app/modules/user/services/image-service.service';
import {ImageSnippet} from '@app/modules/user/models/userModel';

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

  constructor(private router: Router, private imageService: ImageServiceService) {}

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
    this.simpleCourse.imgUrl = this.card.course.imgUrl;
    console.log(this.simpleCourse);
    // TODO
    // write service update course
  }
}
