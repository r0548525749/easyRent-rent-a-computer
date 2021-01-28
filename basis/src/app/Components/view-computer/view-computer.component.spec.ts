import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComputerComponent } from './view-computer.component';

describe('ViewComputerComponent', () => {
  let component: ViewComputerComponent;
  let fixture: ComponentFixture<ViewComputerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComputerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
