import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListAnswerComponent } from './admin-list-answer.component';

describe('AdminListAnswerComponent', () => {
  let component: AdminListAnswerComponent;
  let fixture: ComponentFixture<AdminListAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
