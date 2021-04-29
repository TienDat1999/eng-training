import {Component, Input, OnInit} from '@angular/core';
import {CourseModel} from '@app/modules/user/models/userModel';
import {Router} from '@angular/router';


@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {
  progress: number;
  isShowModal = false;
  @Input() card: CourseModel;

  constructor(private router: Router) {
    setTimeout(() => {
      this.progress = Number(this.card?.wordLearned)  / Number(this.card?.totalWord ) * 100;
    }, 100);
  }

  ngOnInit(): void {
  }

  showPopupTarget(): void {
    this.isShowModal = true;
    console.log(this.isShowModal);

  }

  getParamCard(nameCard: string): void {
    const param = nameCard.toLowerCase().trim().split(/\s+/).join('-');
    this.router.navigate(['/course', param]);
    localStorage.setItem('courseEng', JSON.stringify(this.card));
  }

}
