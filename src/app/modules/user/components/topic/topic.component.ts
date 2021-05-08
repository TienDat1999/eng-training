import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseCardService} from '@app/modules/user/services/course-card.service';
import {CourseModel, TopicModel, TopicStatusModel} from '@app/modules/user/models/userModel';
import { ActivatedRoute, Router } from '@angular/router';
import {TopicService} from '@app/modules/user/services/topics/topic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy  {
  course: CourseModel;
  param: string;
  progress: number;
  private sub: any;
  isOpenTopic = false;
  isEdit: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute, private topicsS: TopicService,
             ) {
  }
  topics: TopicStatusModel[] = [];
  ngOnInit(): void {
    this.onGetTopic();
    const user = JSON.parse(localStorage.getItem('userEnglishTraining'));
    const course = JSON.parse(localStorage.getItem('courseEng'));
    this.isCanEdit(user.userId, course.course.authorId);
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
  onGetTopic(): void {
    this.course = JSON.parse(localStorage.getItem('courseEng'));
    this.topicsS.getTopics(this.course.course.id).subscribe(value => {
      this.topics = value;
    });
    if (this.course?.totalWord === 0){
      this.progress = 0;
    }else {
      this.progress = Number(this.course?.wordLearned) / Number(this.course?.totalWord) * 100;
    }
  }
  goToListWord(id): void {
    this.sub = this.route.params.subscribe(params => {
      this.param =  params['name'];
      this.router.navigate(['/course', this.param, id]);
    });
  }

  openModalTopic(): void {
    this.isOpenTopic = true;
  }
  isCanEdit(userIdLocal, userIdServer): void{
    if (userIdLocal ===  userIdServer){
      this.isEdit = true;
    }
  }
  onRemoveTopic(topic: TopicStatusModel, indexNumber): void {
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
        this.topicsS.removeTopic(topic.topic.id).subscribe(result => {
          if (result.isSuccess){
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.topics.splice(indexNumber,1);
         }
        });
      }
    });

  }

  onHandelReload(): void {
    this.onGetTopic();
  }

  onReviewWord(): void {
    this.router.navigate(['/review-word']);
  }
}
