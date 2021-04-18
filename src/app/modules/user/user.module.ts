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
import { HttpClientModule } from '@angular/common/http';

import {
  ChooseWordTypeComponent,
  DefaultWordTypeComponent,
  InputWordTypeComponent,
  ListenWordTypeComponent
} from '@app/theme/components';
import {FormsModule} from '@angular/forms';
import {
  ClassComponent,
  ExerciseComponent,
  MemberComponent,
  RankingComponent,
  StatusMembersComponent
} from '@app/modules/user/components';

const COMPONENTS = [
  HomeComponent, CourseCardComponent, SimpleCardComponent,
  TopicComponent, WordLessonComponent, PracticeWordComponent,
  ChooseWordTypeComponent, DefaultWordTypeComponent, InputWordTypeComponent,
  ListenWordTypeComponent, ClassComponent, RankingComponent,
  MemberComponent, ExerciseComponent, StatusMembersComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    HttpClientModule,
    ProgressBarModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'learn',
        component: CourseCardComponent,
      },
      {
        path: 'learn/:name',
        component: TopicComponent,
      },
      {
        path: 'detail',
        component: PracticeWordComponent,
      },
      {
        path: 'learn/:name/:id',
        component: WordLessonComponent,
      },
      {
        path: 'class',
        component: ClassComponent,
      }
    ]),
  ],
})
export class UserModule {
}
