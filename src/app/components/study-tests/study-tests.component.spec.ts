import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTestsComponent } from './study-tests.component';

describe('StudyTestsComponent', () => {
  let component: StudyTestsComponent;
  let fixture: ComponentFixture<StudyTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
