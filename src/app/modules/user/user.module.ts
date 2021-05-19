import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {CourseCardComponent} from './components/course-card/course-card.component';
import {SimpleCardComponent} from './components/simple-card/simple-card.component';
import {TopicComponent} from './components/topic/topic.component';
import {WordLessonComponent} from './components/word-lesson/word-lesson.component';
import {CommonModule} from '@angular/common';
import {PracticeWordComponent} from './components/practice-word/practice-word.component';
import {ProgressBarModule} from 'angular-progress-bar';
import {HttpClientModule} from '@angular/common/http';
import {
  ChooseWordTypeComponent,
  DefaultWordTypeComponent,
  InputWordTypeComponent,
  ListenWordTypeComponent,
  ModalTopicComponent,
  CompleteReviewModelComponent,
  ToastrComponent
} from '@app/theme/components';
import {FormsModule} from '@angular/forms';
import {
  ClassComponent,
  ExerciseComponent,
  RankingComponent,
  StatusMembersComponent,
  ReviewWordComponent,
  CourseMemberComponent,
  RankComponent
} from '@app/modules/user/components';
import {UserComponent} from './components/user/user.component';

const COMPONENTS = [
  CourseMemberComponent, ToastrComponent,
  ReviewWordComponent, CompleteReviewModelComponent,
  HomeComponent, CourseCardComponent, SimpleCardComponent,
  TopicComponent, WordLessonComponent, PracticeWordComponent,
  ChooseWordTypeComponent, DefaultWordTypeComponent, InputWordTypeComponent,
  ListenWordTypeComponent, ClassComponent, RankingComponent,
  ExerciseComponent, StatusMembersComponent, ModalTopicComponent, RankComponent,
];

@NgModule({
  declarations: [...COMPONENTS, UserComponent],
  imports: [
    HttpClientModule,
    ProgressBarModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
        children: [
          {
            path: '', redirectTo: 'course', pathMatch: 'full',
          },
          {
            path: 'home',
            component: HomeComponent,
          },
          {
            path: 'course',
            component: CourseCardComponent,
          },
          {
            path: 'course/:name',
            component: TopicComponent,
          },
          {
            path: 'practice',
            component: PracticeWordComponent,
          },
          {
            path: 'course/:name/:id',
            component: WordLessonComponent,
          },
          {
            path: 'class',
            component: ClassComponent,
          },
          {
            path: 'review-word',
            component: ReviewWordComponent,
          }
        ]
      },
    ]),
  ],
})
export class UserModule {
}
