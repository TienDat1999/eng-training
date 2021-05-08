import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWordComponent } from './review-word.component';

describe('ReviewWordComponent', () => {
  let component: ReviewWordComponent;
  let fixture: ComponentFixture<ReviewWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
