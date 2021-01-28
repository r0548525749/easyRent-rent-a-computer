import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHideComponent } from './header-hide.component';

describe('HeaderHideComponent', () => {
  let component: HeaderHideComponent;
  let fixture: ComponentFixture<HeaderHideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderHideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
