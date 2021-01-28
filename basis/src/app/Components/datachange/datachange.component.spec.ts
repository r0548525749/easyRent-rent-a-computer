import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatachangeComponent } from './datachange.component';

describe('DatachangeComponent', () => {
  let component: DatachangeComponent;
  let fixture: ComponentFixture<DatachangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatachangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatachangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
