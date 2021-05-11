import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteReviewModelComponent } from './complete-review-model.component';

describe('CompleteReviewModelComponent', () => {
  let component: CompleteReviewModelComponent;
  let fixture: ComponentFixture<CompleteReviewModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteReviewModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteReviewModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
