import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWordTypeComponent } from './input-word-type.component';

describe('InputWordTypeComponent', () => {
  let component: InputWordTypeComponent;
  let fixture: ComponentFixture<InputWordTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWordTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
