import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExsistingCustomerDetailsComponent } from './exsisting-customer-details.component';

describe('ExsistingCustomerDetailsComponent', () => {
  let component: ExsistingCustomerDetailsComponent;
  let fixture: ComponentFixture<ExsistingCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExsistingCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExsistingCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
