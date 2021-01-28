import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingPageComponent } from './existing-page.component';

describe('ExistingPageComponent', () => {
  let component: ExistingPageComponent;
  let fixture: ComponentFixture<ExistingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
