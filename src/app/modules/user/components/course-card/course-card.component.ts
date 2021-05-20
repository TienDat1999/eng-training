import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {Course, CourseModel, ImageSnippet} from '@app/modules/user/models/course.model';
import Swal from 'sweetalert2';
import {MessageModel} from '@app/modules/user/models/message.model';
import {AuthenticationService} from '@app/modules/auth/services';
import {SignalrService} from '@app/modules/user/services/signalr.service';
import {ConnectionModel} from '@app/modules/user/models/connnection.Model';
import {Router} from '@angular/router';
import {CrawWordModel} from "@app/modules/user/models/word.model";
import {CompetitionService} from "@app/modules/user/services/competition/competition.service";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit, OnDestroy {
  courseCard: CourseModel[] = [];
  selectedFile: ImageSnippet;
  imgUrl: any;
  isCreatCourse: boolean;
  newCourse: Course = new Course({isPublish: false});
  isLogin = false;
  userConnection: ConnectionModel;
  isDisplay = false;
  words: CrawWordModel[] = [];
  word: CrawWordModel;
  senderId: string;

  constructor(private courseService: CourseCardService,
              private authenticationService: AuthenticationService,
              private signal: SignalrService,
              private router: Router,
              private competitionS: CompetitionService,
  ) {
  }

  ngOnInit(): void {
    this.courseService.getCourseCard().subscribe(value => {
      this.courseCard = value;
    });
    if (this.authenticationService.userValue) {
      this.isLogin = true;
    }
    this.signal.startConnection();
    setTimeout(() => {
      this.signal.askServer();
      this.signal.askServerListener();
    }, 3000);
    this.ReceiveNotifyCompetition();
    this.OnShowNotifyRefuse();
    this.onGetWordCompetition();
  }

  ngOnDestroy(): void {
    this.signal.connection.off('userConnected');
    // this.signal.stopConnection();
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

  createCourse(): void {
    this.newCourse.dateCreated = new Date();
    this.courseService.createCourseCard(this.newCourse).subscribe((result: MessageModel<CourseModel>) => {
      if (result.isSuccess) {
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
      } else {
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
    this.courseCard.splice(index, 1);
  }

  sendmessage(): void {
    this.signal.DirectMessage();
  }

  onSelectOption(val: boolean): void {
    this.isDisplay = false;
    this.signal.connection.invoke('OnSendResultCompetition', `${this.senderId}`, val).then();
    if (val) {
      this.signal.connection.invoke('AddToGroup', 'name1', this.words).then();
      this.router.navigate(['/competition']);
      //TODO add to group

    } else {
      //TODO sendback notify refuse;
    }
  }

  ReceiveNotifyCompetition(): void {
    this.signal.connection.on('ReceiveMessage', (result) => {
      if (!!result) {
        this.senderId = result;
        this.isDisplay = true;
      }
      setTimeout(() => {
        this.isDisplay = false;
      }, 5000);
    });
  }

  OnShowNotifyRefuse(): void {
    this.signal.connection.on('ListenResultCompetition', (result) => {
      if (!!result) {
        this.router.navigate(['/competition']).then();
        this.signal.connection.invoke('AddToGroup', 'name1', this.words).then();
      } else {
        console.log('refuse');
      }
      //setTimeout(() => {this.isDisplay = false; }, 5000);
    });
  }

  onGetWordCompetition(): void {
    this.competitionS.getWordCompetition(1).subscribe(value => {
        this.words = value;
      });
  }
}
