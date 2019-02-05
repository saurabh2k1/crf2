import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfEditComponent } from './crf-edit.component';

describe('CrfEditComponent', () => {
  let component: CrfEditComponent;
  let fixture: ComponentFixture<CrfEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
