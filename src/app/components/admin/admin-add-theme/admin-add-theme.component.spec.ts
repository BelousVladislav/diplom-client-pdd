import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddThemeComponent } from './admin-add-theme.component';

describe('AdminAddThemeComponent', () => {
  let component: AdminAddThemeComponent;
  let fixture: ComponentFixture<AdminAddThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
