import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfAddComponent } from './crf-add.component';

describe('CrfAddComponent', () => {
  let component: CrfAddComponent;
  let fixture: ComponentFixture<CrfAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
