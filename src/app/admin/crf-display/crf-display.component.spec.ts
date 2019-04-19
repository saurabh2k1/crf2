import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfDisplayComponent } from './crf-display.component';

describe('CrfDisplayComponent', () => {
  let component: CrfDisplayComponent;
  let fixture: ComponentFixture<CrfDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
