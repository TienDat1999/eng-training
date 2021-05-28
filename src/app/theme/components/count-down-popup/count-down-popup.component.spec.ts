import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDownPopupComponent } from './count-down-popup.component';

describe('CountDownPopupComponent', () => {
  let component: CountDownPopupComponent;
  let fixture: ComponentFixture<CountDownPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountDownPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDownPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
