import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordLessonComponent } from './word-lesson.component';

describe('WordLessonComponent', () => {
  let component: WordLessonComponent;
  let fixture: ComponentFixture<WordLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
