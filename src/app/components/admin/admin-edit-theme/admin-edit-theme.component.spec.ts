import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditThemeComponent } from './admin-edit-theme.component';

describe('AdminEditThemeComponent', () => {
  let component: AdminEditThemeComponent;
  let fixture: ComponentFixture<AdminEditThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
