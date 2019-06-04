import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTasksListComponent } from './admin-tasks-list.component';

describe('AdminTasksListComponent', () => {
  let component: AdminTasksListComponent;
  let fixture: ComponentFixture<AdminTasksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTasksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
