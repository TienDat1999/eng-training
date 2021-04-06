import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefautlWordTypeComponent } from './defautl-word-type.component';

describe('DefautlWordTypeComponent', () => {
  let component: DefautlWordTypeComponent;
  let fixture: ComponentFixture<DefautlWordTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefautlWordTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefautlWordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
