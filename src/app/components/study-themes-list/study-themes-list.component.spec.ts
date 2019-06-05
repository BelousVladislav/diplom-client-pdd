import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyThemesListComponent } from './study-themes-list.component';

describe('StudyThemesListComponent', () => {
  let component: StudyThemesListComponent;
  let fixture: ComponentFixture<StudyThemesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyThemesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyThemesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
