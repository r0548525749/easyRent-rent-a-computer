import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorureComponent } from './borure.component';

describe('BorureComponent', () => {
  let component: BorureComponent;
  let fixture: ComponentFixture<BorureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
