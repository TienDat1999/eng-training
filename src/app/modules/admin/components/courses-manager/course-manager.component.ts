import {Component, OnInit} from '@angular/core';
import {DashboardAdminService} from '@app/modules/admin/services';
import DataSource from 'devextreme/data/data_source';
import {AdminCourse} from '@app/modules/admin/models/course-admin.model';

@Component({
  selector: 'app-admin-course',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})
export class CourseManagerComponent implements OnInit {
  dataSource: DataSource;

  constructor(private service: DashboardAdminService) {
  }

  ngOnInit(): void {
    this.initDataSource();
    console.log(this.dataSource);
  }

  private initDataSource(): void {
    this.dataSource = new DataSource({
      load: (loadOptions) => {
        return this.service.getCoursers(loadOptions)
          .toPromise()
          .then(res =>  res.map( _ => new AdminCourse({
            courseName: _.courseName,
            creator: _.authorName,
            dateCreated: _.dateCreated,
            type: _.type,
            })))
          .catch(error => console.error(error));
      }, insert: row => {
        console.log(row);
        return [];
      }, update: (row, fieldChange) => {
        console.log(row);
        console.log(fieldChange);
        return [];
      }, remove: row => {
        console.log(row);
        return this.service.removeDate(row);
      }
    });
  }
}
