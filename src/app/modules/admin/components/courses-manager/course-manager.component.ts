import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-course',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent implements OnInit {
  dataSource = [
    {
      id: 1,
      code: '321231',
      name: 'abc',
      author: 'ec ec',
      type: 'admin',
    },
    {
      id: 2,
      code: '321231',
      name: 'abc',
      author: 'ec ec',
      type: 'admin',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
