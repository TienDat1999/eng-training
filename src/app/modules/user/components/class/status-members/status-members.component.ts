import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-members',
  templateUrl: './status-members.component.html',
  styleUrls: ['./status-members.component.scss']
})
export class StatusMembersComponent implements OnInit {

  members = [
    {id: 1, name: 'Mark Otto', status: true},
    {id: 2, name: 'Jacob Thornton', status: true},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
    {id: 3, name: 'Thornton Bird', status: false},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
