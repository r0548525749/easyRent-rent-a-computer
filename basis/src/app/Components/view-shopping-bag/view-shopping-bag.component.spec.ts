import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShoppingBagComponent } from './view-shopping-bag.component';

describe('ViewShoppingBagComponent', () => {
  let component: ViewShoppingBagComponent;
  let fixture: ComponentFixture<ViewShoppingBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShoppingBagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShoppingBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
