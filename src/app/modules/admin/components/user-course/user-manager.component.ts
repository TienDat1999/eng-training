import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {DashboardAdminService} from '@app/modules/admin/services';

@Component({
  selector: 'app-user-course',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  dataSource: DataSource;
  constructor(private service: DashboardAdminService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  private initDataSource(): void {
    this.dataSource = new DataSource({
      load: (loadOptions) => {
        return this.service.getUsers(loadOptions)
          .toPromise()
          .then(res => res)
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
