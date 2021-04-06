import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenWordTypeComponent } from './listen-word-type.component';

describe('ListenWordTypeComponent', () => {
  let component: ListenWordTypeComponent;
  let fixture: ComponentFixture<ListenWordTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenWordTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenWordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
