import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTasksComponent } from './admin-add-tasks.component';

describe('AdminAddTasksComponent', () => {
  let component: AdminAddTasksComponent;
  let fixture: ComponentFixture<AdminAddTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
