import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateandtimepopuppComponent } from './dateandtimepopupp.component';

describe('DateandtimepopuppComponent', () => {
  let component: DateandtimepopuppComponent;
  let fixture: ComponentFixture<DateandtimepopuppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateandtimepopuppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateandtimepopuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
