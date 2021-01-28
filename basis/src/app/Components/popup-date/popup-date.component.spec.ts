import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDateComponent } from './popup-date.component';

describe('PopupDateComponent', () => {
  let component: PopupDateComponent;
  let fixture: ComponentFixture<PopupDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
