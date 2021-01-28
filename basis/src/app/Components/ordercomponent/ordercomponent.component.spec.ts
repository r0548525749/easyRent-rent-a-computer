import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercomponentComponent } from './ordercomponent.component';

describe('OrdercomponentComponent', () => {
  let component: OrdercomponentComponent;
  let fixture: ComponentFixture<OrdercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
