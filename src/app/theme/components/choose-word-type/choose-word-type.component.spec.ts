import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseWordTypeComponent } from './choose-word-type.component';

describe('ChooseWordTypeComponent', () => {
  let component: ChooseWordTypeComponent;
  let fixture: ComponentFixture<ChooseWordTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseWordTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseWordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
