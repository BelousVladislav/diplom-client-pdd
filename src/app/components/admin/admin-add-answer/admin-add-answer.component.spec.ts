import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAnswerComponent } from './admin-add-answer.component';

describe('AdminAddAnswerComponent', () => {
  let component: AdminAddAnswerComponent;
  let fixture: ComponentFixture<AdminAddAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
