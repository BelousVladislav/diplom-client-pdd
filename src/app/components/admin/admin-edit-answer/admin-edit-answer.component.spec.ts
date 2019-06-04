import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAnswerComponent } from './admin-edit-answer.component';

describe('AdminEditAnswerComponent', () => {
  let component: AdminEditAnswerComponent;
  let fixture: ComponentFixture<AdminEditAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
