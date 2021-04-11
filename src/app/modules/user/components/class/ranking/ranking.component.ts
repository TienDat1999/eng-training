import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  members = [
    {id: 1, name: 'Mark Otto', score: 12},
    {id: 2, name: 'Jacob Thornton', score: 15},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
    {id: 3, name: 'Thornton Bird', score: 32},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
