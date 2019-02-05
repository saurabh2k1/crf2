import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudyComponent } from './select-study.component';

describe('SelectStudyComponent', () => {
  let component: SelectStudyComponent;
  let fixture: ComponentFixture<SelectStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
