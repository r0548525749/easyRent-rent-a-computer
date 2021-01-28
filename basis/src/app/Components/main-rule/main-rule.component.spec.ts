import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRuleComponent } from './main-rule.component';

describe('MainRuleComponent', () => {
  let component: MainRuleComponent;
  let fixture: ComponentFixture<MainRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
