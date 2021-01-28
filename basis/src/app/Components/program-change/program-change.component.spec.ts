import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramChangeComponent } from './program-change.component';

describe('ProgramChangeComponent', () => {
  let component: ProgramChangeComponent;
  let fixture: ComponentFixture<ProgramChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
