import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {Course, CourseModel, ImageSnippet} from '@app/modules/user/models/course.model';
import Swal from 'sweetalert2';
import {MessageModel} from '@app/modules/user/models/message.model';
import {AuthenticationService} from '@app/modules/auth/services';
import {SignalrService} from '@app/modules/user/services/signalr.service';
import {ConnectionModel} from '@app/modules/user/models/connnection.Model';
import {Router} from '@angular/router';
import {CrawWordModel} from '@app/modules/user/models/word.model';
import {CompetitionService} from '@app/modules/user/services/competition/competition.service';
import {InitCompetition} from "@app/modules/user/models/competition.model";

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
  initCompetitor: InitCompetition = new  InitCompetition();
  word: CrawWordModel;
  senderId: string;
  senderName: string;
  competitorName: string;
  constructor(private courseService: CourseCardService,
              private authenticationService: AuthenticationService,
              private signal: SignalrService,
              private router: Router,
              private competitionS: CompetitionService,
  ) {
  }

  ngOnInit(): void {
   // this.competitorName = this.signal.competitor?.userName;

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
    }, 1000);
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

  onFindCompetitor(): void {
    this.signal.sendRequestCompetition();
  }

  onSelectOption(val: boolean): void {
    this.isDisplay = false;
    this.signal.connection.invoke('OnSendResultCompetition', `${this.senderId}`, val).then();
    if (val) {
      this.signal.connection.invoke('AddToGroup', 'name1', this.initCompetitor).then();
      this.router.navigate(['/competition']);
      // TODO add to group

    } else {
      // TODO sendback notify refuse;
    }
  }

  ReceiveNotifyCompetition(): void {
    this.signal.connection.on('ReceiveMessage', (result) => {
      if (!!result) {
        this.senderId = result.idConnection;
        this.senderName = result.userName;
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
          this.initCompetitor.competitor = this.signal.competitor.userName;
          this.router.navigate(['/competition']).then();
          this.signal.connection.invoke('AddToGroup', 'name1', this.initCompetitor).then();

      } else {
        console.log('refuse');
      }
      // setTimeout(() => {this.isDisplay = false; }, 5000);
    });
  }

  onGetWordCompetition(): void {
    this.competitionS.getWordCompetition(1).subscribe(value => {
        this.initCompetitor.words = value;
      });
  }
}
