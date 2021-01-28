import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MustMatchComponent } from './must-match.component';

describe('MustMatchComponent', () => {
  let component: MustMatchComponent;
  let fixture: ComponentFixture<MustMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MustMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MustMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
