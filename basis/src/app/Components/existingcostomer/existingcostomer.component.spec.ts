import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingcostomerComponent } from './existingcostomer.component';

describe('ExistingcostomerComponent', () => {
  let component: ExistingcostomerComponent;
  let fixture: ComponentFixture<ExistingcostomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingcostomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingcostomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
