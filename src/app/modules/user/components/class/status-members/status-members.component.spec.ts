import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMembersComponent } from './status-members.component';

describe('StatusMembersComponent', () => {
  let component: StatusMembersComponent;
  let fixture: ComponentFixture<StatusMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
