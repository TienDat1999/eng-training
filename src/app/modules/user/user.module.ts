import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {CourseCardComponent} from './components/course-card/course-card.component';
import {SimpleCardComponent} from './components/simple-card/simple-card.component';
import {TopicComponent} from './components/topic/topic.component';


@NgModule({
  declarations: [HomeComponent, CourseCardComponent, SimpleCardComponent, TopicComponent],
  imports: [
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
        path: 'learn/:id',
        component: TopicComponent,
      }
      ])
  ]
})
export class UserModule {
}
