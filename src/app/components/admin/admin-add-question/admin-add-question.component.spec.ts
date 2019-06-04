import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddQuestionComponent } from './admin-add-question.component';

describe('AdminAddQuestionComponent', () => {
  let component: AdminAddQuestionComponent;
  let fixture: ComponentFixture<AdminAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
