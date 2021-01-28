import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAndTimePopupComponent } from './date-and-time-popup.component';

describe('DateAndTimePopupComponent', () => {
  let component: DateAndTimePopupComponent;
  let fixture: ComponentFixture<DateAndTimePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateAndTimePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAndTimePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
