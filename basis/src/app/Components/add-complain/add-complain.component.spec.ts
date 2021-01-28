import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComplainComponent } from './add-complain.component';

describe('AddComplainComponent', () => {
  let component: AddComplainComponent;
  let fixture: ComponentFixture<AddComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
