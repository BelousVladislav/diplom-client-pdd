import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnswerComponent } from './admin-answer.component';

describe('AdminAnswerComponent', () => {
  let component: AdminAnswerComponent;
  let fixture: ComponentFixture<AdminAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
