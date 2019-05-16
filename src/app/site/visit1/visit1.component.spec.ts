import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Visit1Component } from './visit1.component';

describe('Visit1Component', () => {
  let component: Visit1Component;
  let fixture: ComponentFixture<Visit1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Visit1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Visit1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
