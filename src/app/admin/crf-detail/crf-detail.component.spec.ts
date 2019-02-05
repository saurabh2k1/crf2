import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfDetailComponent } from './crf-detail.component';

describe('CrfDetailComponent', () => {
  let component: CrfDetailComponent;
  let fixture: ComponentFixture<CrfDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
