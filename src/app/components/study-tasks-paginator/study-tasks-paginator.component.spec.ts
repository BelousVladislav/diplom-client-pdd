import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTasksPaginatorComponent } from './study-tasks-paginator.component';

describe('StudyTasksPaginatorComponent', () => {
  let component: StudyTasksPaginatorComponent;
  let fixture: ComponentFixture<StudyTasksPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyTasksPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTasksPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
