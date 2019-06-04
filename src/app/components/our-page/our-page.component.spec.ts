import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPageComponent } from './our-page.component';

describe('OurPageComponent', () => {
  let component: OurPageComponent;
  let fixture: ComponentFixture<OurPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
